// @flow
import {
  addChannel,
  inviteToChannel,
  setEvent,
  setOrganization,
  setPubnubKeys,
  setUser,
  changeChannel,
  setLanguageOptions,
  REMOVE_CHANNEL,
  setSchedule,
} from '../feed/dux';
import type { RemoveChannelType } from '../feed/dux';
import { setVideo } from '../videoFeed/dux';
import {
  PUBLISH_ACCEPTED_PRAYER_REQUEST,
  PublishAcceptedPrayerRequestType,
} from '../moment';
import { MUTE_USER } from '../moment/message/dux';
import type { MuteUserType } from '../moment/message/dux';
import { avatarImageExists } from '../util';
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

  constructor (dispatch: (action: any) => void, getStore: () => any ) {
    this.storeDispatch = dispatch;
    this.getStore = getStore;
    this.cookies = new Cookies();
    this.location = new Location();
    this.graph = new GraphQl();

    this.getInitialData = this._getInitialData.bind(this);
    this.handleDataFetchErrors = this._handleDataFetchErrors.bind(this);
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

  _getInitialData (payload: any) {
    Object.keys(payload).forEach(key => {
      switch (key) {
      case 'currentFeeds': {
        const channels = payload.currentFeeds;
        channels.forEach(channel => {
          this.storeDispatch(
            addChannel(
              channel.name,
              channel.id
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
        const event = payload.currentEvent;
        this.storeDispatch(
          setEvent(
            event.title,
            event.id,
            event.startTime,
          )
        );
        if (event.sequence) {
          this.scheduler = new Scheduler(
            event.sequence.serverTime,
            this.getInitialData);
          this.scheduler.run(event.sequence.steps);
        }
        break;
      }
      case 'currentSchedule':
        this.storeDispatch(
          setSchedule(payload.currentSchedule)
        );
        break;
      case 'currentVideo': {
        const video = payload.currentVideo;
        this.storeDispatch(
          setVideo(
            video.url,
            video.type,
          )
        );
        break;
      }
      case 'currentOrganization': {
        // const organization = payload.currentOrganization;
        this.storeDispatch(
          setOrganization(
            3, 'Freedom Church'
            // organization.id,
            // organization.name,
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
    const { user } = moment;
    const now = new Date().getTime();
    const channel = `direct-chat-${now}`;


    this.graph.acceptPrayer(channel, user.pubnubToken)
      .then(data => {
        const { name, id } = data.acceptPrayer;
        this.storeDispatch(addChannel(name, id));
        this.storeDispatch(inviteToChannel(user, id, name));
      });
  }

  muteUser (action:MuteUserType) {
    this.graph.muteUser(action.pubnubToken);
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
    default:
      return;
    }
  }
}

export default ServiceActor;
