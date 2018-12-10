// @Flow
/* global IntervalID */
import {
  addChannel,
  setEvent,
  setOrganization,
  setPubnubKeys,
  setUser,
  setLanguageOptions,
  REMOVE_CHANNEL,
  setSchedule,
  setAuthentication,
  removeAuthentication,
  setScheduleData,
} from '../feed/dux';
import { REHYDRATE } from 'redux-persist/lib/constants';
import { BASIC_AUTH_LOGIN } from '../login/dux';
import type { BasicAuthLoginType } from '../login/dux';
import type { RemoveChannelType } from '../feed/dux';
import { setVideo } from '../videoFeed/dux';
import {
  PUBLISH_ACCEPTED_PRAYER_REQUEST,
  PublishAcceptedPrayerRequestType,
} from '../moment';
import { addError } from '../errors/dux';
import {
  MUTE_USER,
  DIRECT_CHAT,
} from '../moment/message/dux';
import type { MuteUserType } from '../moment/message/dux';
import { avatarImageExists, convertSubscribersToSharedUsers } from '../util';
import Cookies from './cookies';
import Location from './location';
import GraphQl from './graphQL';
import Scheduler from './scheduler';
import { getAvailableForPrayer } from '../selectors/hereNowSelector';
import { getCurrentChannel } from '../selectors/channelSelectors';
import { setPrimaryPane } from '../pane/dux';
import { EVENT } from '../pane/content/event/dux';

class ServiceActor {
  storeDispatch: (action: any) => void;
  graph: GraphQl;
  location: Location;
  getAll: any;
  graphAuth: any;
  getStore: () => any;
  getAuthentication: (variables: any) => any;
  cookies: Cookies;
  handleDataFetchErrors: (payload: any) => void;
  setCurrentState: (payload: any) => void;
  getInitialData: (payload: any) => void;
  scheduler: Scheduler;
  startTimer: () => void;
  checkTime: () => void;
  timer: IntervalID;

  constructor (dispatch: (action: any) => void, getStore: () => any ) {
    this.storeDispatch = dispatch;
    this.getStore = getStore;
    this.cookies = new Cookies();
    this.location = new Location();
    this.graph = new GraphQl();

    this.getInitialData = this._getInitialData.bind(this);
    this.handleDataFetchErrors = this._handleDataFetchErrors.bind(this);
    this.startTimer = this._startTimer.bind(this);
    this.checkTime = this._checkTime.bind(this);
    this.setCurrentState = this._setCurrentState.bind(this);
  }

  async init () {
    const { accessToken, refreshToken } = this.getStore().auth;
    const legacyToken = this.cookies.legacyToken();
    const hostname = this.location.hostname();

    if (accessToken) {
      await this.initWithAccessToken(accessToken, refreshToken, hostname);
    } else if (legacyToken) {
      await this.initWithLegacyToken(legacyToken, hostname);
    }
  }

  async initWithAccessToken (accessToken: string, refreshToken:string, hostname:string) {
    this.graph.setClient(accessToken, hostname);
    this.setCurrentState().catch(error => {
      if (refreshToken) {
        this.getAccessTokenByRefreshToken(refreshToken, hostname);
      } else {
        this.storeDispatch(removeAuthentication());
        this.handleDataFetchErrors(error);
      }
    });
  }

  async initWithLegacyToken (legacyToken:string , hostname: string) {
    try {
      const auth = await this.graph.authenticateByLegacyToken(legacyToken, hostname);
      const { accessToken, refreshToken } = auth.authenticate;
      this.storeDispatch(setAuthentication(accessToken, refreshToken));
      this.setCurrentState();
    } catch (error) {
      this.storeDispatch(removeAuthentication());
      this.handleDataFetchErrors(error);
    }
  }

  async getAccessTokenByBasicAuth (action:BasicAuthLoginType) {
    const hostname = this.location.hostname();

    try {
      const auth = await this.graph.authenticateByBasicAuth(action.email, action.password, hostname);
      const { accessToken, refreshToken } = auth.authenticate;
      this.storeDispatch(setAuthentication(accessToken, refreshToken));
      this.setCurrentState();
    } catch (error) {
      this.handleDataFetchErrors(error);
    }
  }

  async getAccessTokenByRefreshToken (token: string, hostname: string) {
    try {
      const auth = await this.graph.authenticateByRefreshToken(token, hostname);
      const { accessToken, refreshToken } = auth.authenticate;
      this.storeDispatch(setAuthentication(accessToken, refreshToken));
      this.setCurrentState();
    } catch (error) {
      this.storeDispatch(removeAuthentication());
      this.handleDataFetchErrors(error);
    }
  }

  async _setCurrentState () {
    return new Promise((resolve, reject) => {
      this.graph.currentState().then(data => {
        this.getInitialData(data);
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  _handleDataFetchErrors (payload: any) {  
    const { errors } = payload.response;
    if (errors) {
      // eslint-disable-next-line no-console
      console.log('The graphql response returned errors:');
      for (const err in errors) {
        const { message, extensions } = errors[err];
        
        if (message) {
          this.storeDispatch(addError(message));
          // eslint-disable-next-line no-console
          console.log(` - ${message}`);
        }
        if (extensions) {
          const { code = '' } = extensions;
          if (code) {
            switch (code) {
            case 'UNAUTHORIZED':
              this.storeDispatch(removeAuthentication());
              return;
            }
          }
        }
      }
    } else {
      // eslint-disable-next-line no-console
      console.log('The graphql response returned' +
        'an error code but no error messages.');
    }
  }

  _startTimer () {
    if (!this.timer) {
      this.timer = setInterval(this.checkTime, 1000);
    }
  }

  async _checkTime () {
    const now = Date.now();
    const { schedule, sequence } = this.getStore();
    if (sequence && sequence.steps && sequence.steps[0]) {
      const [ step ] = sequence.steps;
      if (step.transitionTime * 1000 <= now) {
        this.getInitialData(step.data);

        let newSequence = {
          serverTime: sequence.serverTime,
          steps: sequence.steps.splice(1),
        };
        if (newSequence.steps.length === 0) {
          newSequence = {
            steps: [],
          };
          const nextEvent = schedule.shift();
          this.storeDispatch(setScheduleData(schedule));
          try {
            const sequenceResponse = await this.graph.sequence(nextEvent.startTime);
            this.getInitialData(sequenceResponse);
          } catch (error) {
            this.handleDataFetchErrors(error);
          }
        }
        this.storeDispatch(
          {
            type: 'SET_SEQUENCE',
            sequence: newSequence,
          }
        );
      }
      if (!step.data && step.fetchTime * 1000 <= now) {
        const includeFeed = step.queries.indexOf('feeds') > -1;
        const includeVideo = step.queries.indexOf('video') > -1;

        try {
          const eventAtTime = await this.graph.eventAtTime(step.transitionTime, includeFeed, includeVideo);
          this.storeDispatch(setScheduleData(
            step.transitionTime,
            eventAtTime
          ));
        } catch (error) {
          this.handleDataFetchErrors(error);
        }
      }
    }
  }

  _getInitialData (payload: any) {
    Object.keys(payload).forEach(objKey => {
      const key = objKey === 'eventAt' ? 'currentEvent' : objKey;
      switch (key) {
      case 'currentEvent': {
        const event = payload.currentEvent || payload.eventAt;
        let hasVideo = false;
        let hasFeed = false;
        if (event.title && event.id && event.startTime && event.videoStartTime) {
          this.storeDispatch(
            setEvent(
              event.title || '',
              event.id || 0,
              event.startTime || 0,
              event.videoStartTime || 0,
            )
          );
          const hasSequence = event.sequence && event.sequence.steps && event.sequence.steps.length;
          if (hasSequence) {
            const now = Date.now();
            const sequence = {
              serverTime: event.sequence.serverTime,
              steps: event.sequence.steps.filter(step =>
                step.transitionTime * 1000 > now),
            };
            event.sequence.steps.filter(step =>
              step.transitionTime * 1000 <= now).forEach(step => {
              if (step.queries.indexOf('feeds') > -1) {
                hasFeed = true;
              }
              if (step.queries.indexOf('video') > -1) {
                hasVideo = true;
              }
            });
            this.storeDispatch(
              {
                type: 'SET_SEQUENCE',
                sequence: sequence,
              }
            );
            this.startTimer();
          }
          if (event.feeds !== undefined && (!hasSequence || hasFeed)) {
            const channels = event.feeds;
            const currentChannels = this.getStore().channels;
            Object.keys(currentChannels).forEach(id => {
              this.storeDispatch(
                {
                  type: 'REMOVE_CHANNEL',
                  channel: id,
                }
              );
            });
            channels.forEach(channel => {
              const participants = convertSubscribersToSharedUsers(channel.subscribers);
              this.storeDispatch(
                addChannel(
                  channel.name,
                  channel.id,
                  participants
                )
              );
              if (channel.name === 'Public') {
                this.storeDispatch(
                  setPrimaryPane(channel.id, EVENT)
                );
              }
            });
          }
          if (event.video !== undefined && (!hasSequence || hasVideo)) {
            const { video } = event;
            if (!video) {
              this.storeDispatch(
                setVideo('','')
              );
            } else {
              this.storeDispatch(
                setVideo(
                  video.url,
                  video.type,
                )
              );
            }
          }
        }
        break;
      }
      case 'schedule': {
        const schedule = payload.schedule.filter(item =>
          item.startTime * 1000 > Date.now());
        const nextEvent = schedule.shift();
        this.storeDispatch(setSchedule(schedule));
        if (nextEvent) {
          try {
            this.graph.sequence(nextEvent.startTime).then(this.getInitialData, this.handleDataFetchErrors);
          } catch (error) {
            this.handleDataFetchErrors(error);
          }
        }
      }
        break;
      case 'currentOrganization': {
        const organization = payload.currentOrganization;
        this.storeDispatch(
          setOrganization(
            organization.id,
            organization.name,
          )
        );
        break;
      }
      case 'currentUser': {
        const user = payload.currentUser;
        this.storeDispatch(
          setUser(
            {
              id: user.id,
              name: user.nickname,
              avatar: user.avatar,
              pubnubAccessKey: user.pubnubAccessKey,
              pubnubToken: user.pubnubToken,
              role: {
                label: user.role ? user.role.label : '',
                permissions: [],
              },
            }
          )
        );
        avatarImageExists(payload.currentUser.id).then(exists => {
          if (exists) {
            this.storeDispatch(
              {
                type: 'SET_AVATAR',
                url: `https://chop-v3-media.s3.amazonaws.com/users/avatars/${payload.currentUser.id}/thumb/photo.jpg`,
              }
            );
          }
        }) ;
        break;
      }
      case 'pubnubKeys': {
        const { publishKey, subscribeKey } = payload.pubnubKeys;
        this.storeDispatch(
          setPubnubKeys(
            publishKey,
            subscribeKey
          )
        );
        break;
      }
      case 'currentLanguages': {
        const languages = payload.currentLanguages;
        this.storeDispatch(
          setLanguageOptions(languages)
        );
        break;
      }
      }
    });
  }

  async publishAcceptedPrayerRequest (action:PublishAcceptedPrayerRequestType) {
    const currentChannel = getCurrentChannel(this.getStore());
    const { channels } = this.getStore();
    const currentMoments = channels[currentChannel].moments;
    const moment = currentMoments.find(moment => moment.prayerChannel === action.prayerChannel);
    const { user, prayerChannel } = moment;
    const hosts = getAvailableForPrayer(this.getStore()).map(user => user.id);

    try {
      const data = await this.graph.acceptPrayer(prayerChannel, user.pubnubToken, hosts, user.name);
      const { name, id, subscribers } = data.acceptPrayer;
      const participants = convertSubscribersToSharedUsers(subscribers);
      this.storeDispatch(addChannel(name, id, participants));
    } catch (error) {
      this.handleDataFetchErrors(error);
    }
  }

  async muteUser (action:MuteUserType) {
    try {
      const { feedToken, nickname } = action;
      const ip = '0.0.0.0';
      await this.graph.muteUser(feedToken, nickname, ip);
    } catch (error) {
      this.handleDataFetchErrors(error);
    }
  }

  async directChat (action: any) {
    try {
      const { otherUserPubnubToken, otherUserNickname } = action;
      const directChat = await this.graph.directChat(otherUserPubnubToken, otherUserNickname);
      const { name, id, subscribers } = directChat.createDirectFeed;
      const participants = convertSubscribersToSharedUsers(subscribers);
      this.storeDispatch(addChannel(name, id, participants));
    } catch (error) {
      this.handleDataFetchErrors(error);
    }
  }

  async removeChannel (action:RemoveChannelType) {
    try {
      await this.graph.leaveChannel(action.channel);
    } catch (error) {
      this.handleDataFetchErrors(error);
    }
  }

  dispatch (action: any) {
    if (!action && !action.type) {
      return;
    }
    switch (action.type) {
    case REHYDRATE:
      this.init();
      return;
    case BASIC_AUTH_LOGIN:
      this.getAccessTokenByBasicAuth(action);
      return;
    case PUBLISH_ACCEPTED_PRAYER_REQUEST:
      this.publishAcceptedPrayerRequest(action);
      return;
    case REMOVE_CHANNEL:
      this.removeChannel(action);
      return;
    case MUTE_USER:
      this.muteUser(action);
      return;
    case DIRECT_CHAT:
      this.directChat(action);
      return;
    default:
      return;
    }
  }
}

export default ServiceActor;
