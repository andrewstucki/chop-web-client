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
  PUBLISH_MUTE_USER,
  DIRECT_CHAT,
} from '../moment/message/dux';
import type { PublishMuteUserType } from '../moment/message/dux';
import {
  avatarImageExists,
  convertSubscribersToSharedUsers,
  isEmpty,
} from '../util';
import Cookies from './cookies';
import Location from './location';
import GraphQl from './graphQL';
import Scheduler from './scheduler';
import { getAvailableForPrayer } from '../selectors/hereNowSelector';
import { getCurrentChannel } from '../selectors/channelSelectors';
import { setPrimaryPane } from '../pane/dux';
import { EVENT } from '../pane/content/event/dux';
import { CHAT } from '../pane/content/chat/dux';

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
    this.handleEvent = this._handleEvent.bind(this);
  }

  async init () {
    const { accessToken, refreshToken } = this.getStore().auth;
    const legacyToken = this.cookies.legacyToken();
    const hostname = Location.hostname();

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
    const hostname = Location.hostname();

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
        if (step.data) {
          this.getInitialData(step.data);

          const newSteps = sequence.steps.splice(1);
          this.storeDispatch(
            {
              type: 'SET_SEQUENCE',
              sequence: {
                ...sequence,
                steps: newSteps,
              },
            }
          );
        } else {
          try {
            const eventAtTime = await this.graph.eventAtTime(step.transitionTime);
            this.getInitialData(eventAtTime);

            const newSteps = sequence.steps.splice(1);
            this.storeDispatch(
              {
                type: 'SET_SEQUENCE',
                sequence: {
                  ...sequence,
                  steps: newSteps,
                },
              }
            );
          } catch (error) {
            this.handleDataFetchErrors(error);
          }
        }
      }
      if (!step.data && step.fetchTime * 1000 <= now) {
        try {
          const eventAtTime = await this.graph.eventAtTime(step.transitionTime);
          this.storeDispatch(setScheduleData(
            step.transitionTime,
            eventAtTime
          ));
        } catch (error) {
          this.handleDataFetchErrors(error);
        }
      }
    }
    if (sequence && sequence.steps && sequence.steps.length === 0) {
      if (schedule[0] && schedule[0].startTime * 1000 < now) {
        schedule.shift();
      }
      const [ nextEvent ] = schedule;
      this.storeDispatch(setScheduleData(schedule));
      try {
        const sequenceResponse = await this.graph.sequence(nextEvent.startTime);
        this.getInitialData(sequenceResponse);
      } catch (error) {
        this.handleDataFetchErrors(error);
      }
    }
  }

  _getInitialData (payload: any) {
    if (payload === undefined || payload === null) {
      return;
    }
    const { pubnubKeys } = payload;
    if (pubnubKeys) {
      const { publishKey, subscribeKey } = pubnubKeys;
      this.storeDispatch(
        setPubnubKeys(
          publishKey,
          subscribeKey
        )
      );
    }
    const { currentUser } = payload;
    if (currentUser) {
      const user = currentUser;
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
      });
    }
    if (payload.eventAt || payload.currentEvent || payload.schedule) {
      this.handleEvent(payload);
    }
    const { currentOrganization } = payload;
    if (currentOrganization) {
      const organization = currentOrganization;
      this.storeDispatch(
        setOrganization(
          organization.id,
          organization.name,
        )
      );
    }
    const { currentLanguages } = payload;
    if (currentLanguages) {
      const languages = currentLanguages;
      this.storeDispatch(
        setLanguageOptions(languages)
      );
    }
  }

  _handleEvent (payload) {
    const event = payload.currentEvent || payload.eventAt;
    if (event) {
      if (event.title !== undefined &&
        event.id !== undefined &&
        event.eventTime !== undefined &&
        event.eventTime.id !== undefined &&
        event.startTime !== undefined &&
        event.videoStartTime !== undefined) {
        this.storeDispatch(
          setEvent(
            event.title,
            event.id,
            event.eventTime.id,
            event.startTime,
            event.videoStartTime,
          )
        );
      }

      const { sequence } = event;
      if (sequence && sequence.steps && sequence.steps.length > 0) {
        const now = Date.now();
        const updatedSequence = {
          ...sequence,
          steps: sequence.steps.filter(step =>
            step.transitionTime * 1000 > now),
        };

        this.storeDispatch(
          {
            type: 'SET_SEQUENCE',
            sequence: updatedSequence,
          }
        );

        this.startTimer();
      }
      if (event.feeds) {
        const { feeds:newChannels } = event;
        const { channels:currentChannels } = this.getStore();

        Object.keys(currentChannels).forEach(id => {
          if (!newChannels.some(channel => channel.id === id)) {
            this.storeDispatch(
              {
                type: 'REMOVE_CHANNEL',
                channel: id,
              }
            );
          }
        });

        newChannels.forEach(channel => {
          if (!(channel.id in currentChannels)) {
            const participants = convertSubscribersToSharedUsers(channel.subscribers);
            this.storeDispatch(
              addChannel(
                channel.name,
                channel.id,
                channel.direct,
                participants
              )
            );
            if (channel.name === 'Public') {
              this.storeDispatch(
                setPrimaryPane(channel.id, EVENT)
              );
            }
          }
        });

        const { video } = event;
        if (video) {
          this.storeDispatch(
            setVideo(
              video.url,
              video.type,
            )
          );
        }
      }
    }
    const { schedule } = payload;
    if (schedule) {
      const isBetweenEvents = isEmpty(event.id) && isEmpty(this.getStore().event.id);
      const updatedSchedule = schedule.filter(item =>
        item.startTime * 1000 > Date.now());

      this.storeDispatch(setSchedule(updatedSchedule));

      if (isBetweenEvents) {
        const [nextEvent] = schedule;
        if (nextEvent) {
          try {
            this.graph.sequence(nextEvent.startTime).then(this.getInitialData, this.handleDataFetchErrors);
          } catch (error) {
            this.handleDataFetchErrors(error);
          }
        }
      }
    }
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
      const { name, id, direct, subscribers } = data.acceptPrayer;
      const participants = convertSubscribersToSharedUsers(subscribers);
      this.storeDispatch(addChannel(name, id, direct, participants));
      this.storeDispatch(setPrimaryPane(id, CHAT));
    } catch (error) {
      this.handleDataFetchErrors(error);
    }
  }

  async muteUser (action:PublishMuteUserType) {
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
      const { name, id, direct, subscribers } = directChat.createDirectFeed;
      const participants = convertSubscribersToSharedUsers(subscribers);
      this.storeDispatch(addChannel(name, id, direct, participants));
      this.storeDispatch(setPrimaryPane(id, CHAT));
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
    case PUBLISH_MUTE_USER:
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
