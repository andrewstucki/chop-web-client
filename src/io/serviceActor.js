// @Flow
/* global IntervalID */
import {
  addChannel,
  setEvent,
  setOrganization,
  setPubnubKeys,
  setUser,
  changeChannel,
  setLanguageOptions,
  REMOVE_CHANNEL,
  setSchedule,
  setScheduleData,
} from '../feed/dux';
import type { RemoveChannelType } from '../feed/dux';
import { setVideo } from '../videoFeed/dux';
import {
  PUBLISH_ACCEPTED_PRAYER_REQUEST,
  PublishAcceptedPrayerRequestType,
} from '../moment';
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

class ServiceActor {
  storeDispatch: (action: any) => void
  graph: GraphQl
  location: Location
  getAll: any
  graphAuth: any
  getStore: () => any
  getAuthentication: (variables: any) => any
  cookies: Cookies
  handleDataFetchErrors: (payload: any) => void
  getInitialData: (payload: any) => void
  scheduler: Scheduler
  startTimer: () => void
  checkTime: () => void
  timer: IntervalID

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
  }

  getAccessToken () {
    const token = this.cookies.legacyToken();
    if (!token) {
      alert('You have no token. You should get one.');
      return;
    }
    const hostname = this.location.hostname();
    this.graph.authenticate(token, hostname).then(() => {
      this.graph.currentState()
        .then(this.getInitialData, this.handleDataFetchErrors);
    });
  }

  _handleDataFetchErrors (payload: any) {
    // TODO: log these errors better (new-relic?)
    if (payload.errors) {
      // eslint-disable-next-line no-console
      console.log('The graphql response returned errors:');
      for (const err in payload.errors) {
        const errorMessage = payload.errors[err].message;
        // eslint-disable-next-line no-console
        if (payload.errors[err].message) console.log(` - ${errorMessage}`);
      }
    } else {
      // eslint-disable-next-line no-console
      console.log('The graphql response returned' +
        'an error code but no error messages.');
    }
    // TODO: give a nicer error message to the user
    alert('It was not possible to get the event information.');
  }

  _startTimer () {
    if (!this.timer) {
      this.timer = setInterval(this.checkTime, 1000);
    }
  }

  _checkTime () {
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
          this.storeDispatch(setSchedule(schedule));
          this.graph.sequence(nextEvent.startTime)
            .then(this.getInitialData, this.handleDataFetchErrors);          
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
        this.graph.eventAtTime(step.transitionTime, includeFeed, includeVideo)
          .then(result => {
            this.storeDispatch(
              setScheduleData(
                step.transitionTime,
                result
              )
            );
          });
      }
    }
  }

  _getInitialData (payload: any) {
    Object.keys(payload).forEach(objKey => {
      const key = objKey === 'eventAt' ? 'currentEvent' : objKey;
      switch (key) {
      case 'currentFeeds': {
        const channels = payload.currentFeeds;
        const currentChannels = this.getStore().channels;
        Object.keys(currentChannels).forEach(id => {
          this.storeDispatch(
            {
              type: 'REMOVE_CHANNEL',
              channel: id,
            }
          );
        });
        this.storeDispatch(
          { type: 'CLEAR_CHANNEL' }
        );
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
              changeChannel(channel.id)
            );
          }
        });
        break;
      }
      case 'currentEvent': {
        const event = payload.currentEvent || payload.eventAt;
        let hasVideo = false;
        let hasFeed = false;
        if (event !== undefined) {
          this.storeDispatch(
            setEvent(
              event.title || '',
              event.id || 0,
              event.startTime || 0,
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
            this.storeDispatch(
              { type: 'CLEAR_CHANNEL' }
            );
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
                  changeChannel(channel.id)
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
          this.graph.sequence(nextEvent.startTime)
            .then(this.getInitialData, this.handleDataFetchErrors);
        }
      }
        break;
      case 'currentVideo': {
        const video = payload.currentVideo;
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
        break;
      }
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
                label: user.role.label,
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

  publishAcceptedPrayerRequest (action:PublishAcceptedPrayerRequestType) {
    const { currentChannel } = this.getStore();
    const { channels } = this.getStore();
    const currentMoments = channels[currentChannel].moments;
    const moment = currentMoments.find(moment => moment.id === action.id);
    const { user, prayerChannel } = moment;

    this.graph.acceptPrayer(prayerChannel, user.pubnubToken)
      .then(data => {
        const { name, id, subscribers } = data.acceptPrayer;
        const participants = convertSubscribersToSharedUsers(subscribers);
        this.storeDispatch(addChannel(name, id, participants));
      });
  }

  muteUser (action:MuteUserType) {
    this.graph.muteUser(action.pubnubToken);
  }

  directChat (action: any) {
    this.graph.directChat(action.otherUserPubnubToken).
      then(data => {
        const { name, id, subscribers } = data.createDirectFeed;
        const participants = convertSubscribersToSharedUsers(subscribers);
        this.storeDispatch(addChannel(name, id, participants));
      });
  }

  removeChannel (action:RemoveChannelType) {
    this.graph.leaveChannel(action.channel);
  }

  dispatch (action: any) {
    if (!action && !action.type) {
      return;
    }
    switch (action.type) {
    case 'INIT':
      this.getAccessToken();
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
