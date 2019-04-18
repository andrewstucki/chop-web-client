// @flow
import Pubnub from 'pubnub';
import { Dispatch  } from 'redux';
import {
  removeHereNow,
  setHereNow,
  addHereNow,
  loadHistory,
  setSalvations,
  SET_CHANNELS,
  joinChannel,
} from '../feed/dux';
import type {
  FeedType,
} from '../feed/dux';
import type {
  ReactionType,
} from '../reactions/reactionButton/dux';
import Converter from './converter';
import type { MomentType } from '../moment/dux';
import { receiveMoment } from '../moment/dux';
import { receiveAcceptedPrayerRequest } from '../moment/actionableNotification/dux';
import {
  receiveLeftChannelNotification,
  receiveMuteUserNotification,
  receivePrayerNotification,
} from '../moment/notification/dux';
import { deleteMessage, receiveMuteUser } from '../moment/message/dux';
import {
  publishSalvation,
  salvationMomentExists,
} from '../anchorMoment/dux';
import {
  getLegacyChannel,
  getHostChannel,
  getPublicChannel,
  getCurrentChannel,
  getMutedUsers,
} from '../selectors/channelSelectors';
import { getMessageTimestamp } from '../util';
import type {
  PubnubReciveMessageType,
  LegacyNewMessageType,
} from './converter';
import bugsnagClient from '../util/bugsnag';

type PubnubStatusEventType = {
  affectedChannelGroups: Array<string>,
  affectedChannels: Array<string>,
  subscribedChannels: Array<string>,
  category: string,
  operation: string,
  lastTimetoken: string,
  currentTimetoken: string,
}

type PubnubPresenceEventStateType = {
  available_prayer: boolean, // eslint-disable-line camelcase
  nickname: string,
}

type PubnubPresenceEventType = {
  action : string,
  channel : string,
  occupancy : number,
  state : PubnubPresenceEventStateType,
  channelGroup : string,
  publishTime : number,
  timetoken : number,
  uuid : string,
}

type LegacyReactionType = {
  type: 'REACTION',
  nickname: string,
  channelToken: string,
  reactionId: string,
}

type LegacyMessageType = {
  messageText: string,
  language: string,
  eventTimeId: string,
  eventTimeOffset: string,
  eventTitle: string,
  uniqueMessageToken: string,
  fromNickname: string,
  fromToken: string,
  msgId: string,
  timestamp: string,
  fromAvatar: string,
  isHost: boolean,
  label: string,
  isVolunteer: boolean,
  isUser: boolean,
  userId: string,
  organizationId: string,
  organizationName: string,
  roomType: string,
  channelToken: string,
  eventStartTime: string,
};

type LegacyDeleteMessageType = {
  umt: string,
  channelToken: string,
}

type LegacyMuteUserType = {
  nickname: string,
  fromNickname: string,
  channelToken: string,
  timestamp: string,
}

type LegacyLeaveChannelType = {
  messageText: string,
  timestamp: string,
  userId: string,
  fromNickname: string,
  type: string,
  roomType: string,
  channelToken: string,
  timestamp: string,
};

type LegacyAcceptPrayerRequestType = {
  timestamp: number,
  hostName: string,
  guestName: string,
}

type LegacyPrayerNotificationType = {
  messageText: string,
  hostName: string,
  guestName: string,
  channel: string,
  timestamp: string,
  fromNickname: string,
}

type LegacyPollVoteType = {
  slideId: string,
  slideKind: string,
  count: number,
}

type PubnubMessageEventDataType =
  | MomentType
  | LegacyReactionType
  | LegacyMessageType
  | LegacyDeleteMessageType
  | LegacyMuteUserType
  | LegacyLeaveChannelType
  | LegacyAcceptPrayerRequestType
  | LegacyPrayerNotificationType
  | LegacyPollVoteType;

export type PubnubMessageEventType = {
  channel: string,
  message: {
    action: string,
    data: PubnubMessageEventDataType,
  },
  publisher: string,
  subscription: string,
  timetoken: string,
}

type PubnubPublishMessageType = {
  channel: string,
  message: {
    action: string,
    channel: string,
    data: any,
  }
}

class Chat {
  pubnub: Pubnub;
  storeDispatch: Dispatch;
  getState: () => FeedType;
  previousLanguage: string | null;

  constructor (dispatch: Dispatch, getState: () => FeedType) {
    // $FlowFixMe
    this.onStatus = this.onStatus.bind(this);
    // $FlowFixMe
    this.onMessage = this.onMessage.bind(this);
    // $FlowFixMe
    this.onPresence = this.onPresence.bind(this);
    // $FlowFixMe
    this.loadHistory = this.loadHistory.bind(this);
    // $FlowFixMe
    this.publish = this.publish.bind(this);
    // $FlowFixMe
    this.publishReaction = this.publishReaction.bind(this);
    // $FlowFixMe
    this.publishDeleteMessage = this.publishDeleteMessage.bind(this);
    // $FlowFixMe
    this.receivePollVote = this.receivePollVote.bind(this);
    // $FlowFixMe
    this.init = this.init.bind(this);

    this.storeDispatch = dispatch;
    this.getState = getState;

    this.previousLanguage = null;
  }

  init () {
    const state = this.getState();

    if (this.pubnub ||
        !(state.pubnubKeys.publish &&
          state.pubnubKeys.subscribe &&
          //  state.currentUser.pubnubAccessKey &&
          state.currentUser.pubnubToken)) {
      return;
    }

    Converter.config(this.getState);

    this.pubnub = new Pubnub(
      {
        publishKey: state.pubnubKeys.publish,
        subscribeKey: state.pubnubKeys.subscribe,
        authKey: state.currentUser.pubnubAccessKey,
        uuid: state.currentUser.pubnubToken,
      }
    );

    this.pubnub.addListener(
      {
        status: this.onStatus,
        message: this.onMessage,
        presence: this.onPresence,
      }
    );
  }

  setPubnubState () {
    const { currentUser: { avatar, name }, currentLanguage: language, channels } = this.getState();
    const channelList = Object.keys(channels);
    if (channelList.length > 0) { // Don't set the state before channels have loaded
      this.pubnub.setState(
        {
          channels: channelList,
          state: {
            available_help: true, // eslint-disable-line camelcase
            available_prayer: true, // eslint-disable-line camelcase
            avatar: avatar,
            clientIp: '205.236.56.99',
            country_name: 'United States', // eslint-disable-line camelcase
            lat: 35.6500,
            lon: -97.4214,
            nickname: name,
            userId: null,
            language: language,
          },
        },
        (status, _response) => {
          bugsnagClient.notify(`Pubnub Error with setState: message: ${status.message}, type: ${status.type}`);
        }
      );
    }
  }

  onStatus (event: PubnubStatusEventType) {
    switch (event.category) {
      case 'PNConnectedCategory':
        this.setPubnubState();
        this.storeDispatch({
          type: 'CHAT_CONNECTED',
        });
        return;
    }
  }

  loadHistory (messages: Array<any>, channel: string) {
    const moments = [];
    const hostChannel = getHostChannel(this.getState());
    messages.map(message => {
      switch (message.entry.action) {
        case 'newMessage': {
          const {fromNickname, channelToken, timestamp} = message.entry.data;
          if (message.entry.data.type === 'system') {
            moments.push(receiveLeftChannelNotification(fromNickname, channelToken, getMessageTimestamp(timestamp)).moment);
          } else {
            moments.push(Converter.legacyNewMessageToCwcMessage(message.entry.data));
          }
          return;
        }
        case 'newLiveResponseRequest':
          if (message.entry.data.type === 'prayer') {
            moments.push(Converter.legacyToCwcPrayer(message.entry));
          }
          return;
        case 'muteMessage':
          moments.splice(moments.findIndex(moment => moment.id === message.entry.data.umt));
          return;
        case 'muteUser': {
          const mutedUsers = getMutedUsers(this.getState());
          const { nickname, fromNickname, timestamp } = message.entry.data;
          const { name:currentUserName } = this.getState().currentUser;

          if (!mutedUsers.includes(nickname) && currentUserName !== nickname) {
            this.storeDispatch(
            // $FlowFixMe
              receiveMuteUser(nickname)
            );

            if (channel === hostChannel) {
              moments.push(
                receiveMuteUserNotification(
                  fromNickname,
                  nickname,
                  hostChannel,
                  getMessageTimestamp(timestamp)
                ).moment);
            }
          }
          return;
        }
        case 'livePrayerAccepted': {
          const hostChannel = getHostChannel(this.getState());
          moments.push(
            receivePrayerNotification(message.entry.data.hostName, message.entry.data.guestName, hostChannel, getMessageTimestamp(message.entry.data.timestamp)).moment
          );
          return;
        }
        case 'pollVote':
          this.receivePollVote(message.entry.data);
          return;
      }
    });

    this.storeDispatch(
      loadHistory(moments, channel)
    );
  }

  onPresence (event: PubnubPresenceEventType) {
    const { action, channel, uuid } = event;

    switch (action) {
      case 'join':
        this.storeDispatch(
          addHereNow(
            channel,
            this.filterUserState(event),

          )
        );
        break;
      case 'timeout':
      case 'leave':
        this.storeDispatch(
          removeHereNow(channel, uuid)
        );
        break;
    }
  }

  onMessage (event: PubnubReciveMessageType<LegacyNewMessageType>) {
    const { channels } = this.getState();
    let hasMomentBeenRecieved = false;
    switch (event.message.action) {
      case 'newMessage': {
        const message = event.message.data;
        if (message.type === 'system') {
          this.storeDispatch(
          // $FlowFixMe
            receiveLeftChannelNotification(message.fromNickname, message.channelToken, getMessageTimestamp(message.timestamp)),
          );
        } else {
          hasMomentBeenRecieved = Object.keys(channels).find(
            id => channels[id].moments.find(
            // $FlowFixMe
              moment => moment.id === event.message.data.msgId));

          if (!hasMomentBeenRecieved) {
            const moment = Converter.legacyNewMessageToCwcMessage(event.message.data);

            if (moment.text) {
              this.storeDispatch(
                receiveMoment(event.channel, Converter.legacyNewMessageToCwcMessage(event.message.data))
              );
            }
          }
        }
        return;
      }
      case 'muteUser': {
        const mutedUsers = getMutedUsers(this.getState());
        // $FlowFixMe
        const { nickname, fromNickname, timestamp } = event.message.data;
        const { name:currentUserName } = this.getState().currentUser;

        if (!mutedUsers.includes(nickname) && currentUserName !== nickname) {
          this.storeDispatch(
            receiveMuteUser(nickname)
          );

          if (currentUserName !== fromNickname) {
            this.storeDispatch(
              receiveMuteUserNotification(
                fromNickname,
                nickname,
                getHostChannel(this.getState()),
                getMessageTimestamp(timestamp)
              )
            );
          }
        }
        return;
      }
      case 'videoReaction':
      // $FlowFixMe
        if (this.getState().reactions.find(reaction => event.message.data.reactionId === reaction.id) === undefined) {
          this.storeDispatch(
            {
              type: 'RECEIVE_REACTION',
              reaction: {
                type: 'REACTION',
                // $FlowFixMe
                id: event.message.data.reactionId,
              },
            }
          );
        }
        return;
      case 'newLiveResponseRequest':
        if (event.message.data.type === 'prayer') {
          this.storeDispatch(
            Converter.legacyToCwcPrayer(event.message)
          );
        }
        return;
      case 'muteMessage': {
        const { channelToken, umt } = event.message.data;
        const { channels } = this.getState();

        if (channels[channelToken]) {
          const { moments } = channels[channelToken];
          // $FlowFixMe
          if (moments.find(moment => moment.id === umt) !== undefined) {
            this.storeDispatch(
              // $FlowFixMe
              deleteMessage(umt, channelToken)
            );
          }
        }
        return;
      }
      case 'removeLiveResponseRequest': {
      // $FlowFixMe
        const cancelled = !!event.message.data.leave;
        const hostChannel = getHostChannel(this.getState());
        this.storeDispatch(
        // $FlowFixMe
          receiveAcceptedPrayerRequest(event.message.data.channel, hostChannel, cancelled)
        );
        return;
      }
      case 'livePrayerAccepted': {
        const hostChannel = getHostChannel(this.getState());
        this.storeDispatch(
        // $FlowFixMe
          receivePrayerNotification(event.message.data.hostName, event.message.data.guestName, hostChannel, getMessageTimestamp(event.message.data.timestamp))
        );
        return;
      }
      case 'pollVote':
      // $FlowFixMe
        this.receivePollVote(event.message.data);
        return;
      case 'newDirectResponseRequest': {
        const { channel, requesterPubnubToken, requesterNickname } = event.message.data;
        this.storeDispatch(
          joinChannel(channel, requesterPubnubToken, requesterNickname)
        );
        return;
      }
    }
  }

  publish (message:PubnubPublishMessageType) {
    this.pubnub.publish(
      message
    );
  }

  publishReaction (reaction: ReactionType, channelId: string) {
    this.publish(
      {
        channel: channelId,
        message: {
          action: 'videoReaction',
          channel: channelId,
          data: Converter.cwcToLegacyReaction(reaction, channelId),
        },
      }
    );
  }

  subscribe (channels: Array<string>) {
    if (!this.pubnub) {
      return;
    }
    this.pubnub.subscribe (
      {
        channels,
        withPresence: true,
      }
    );
  }

  unsubscribe (channels: Array<string>) {
    this.pubnub.unsubscribe (
      {
        channels,
      }
    );
  }

  publishDeleteMessage (id: string, channelId: string) {
    this.publish(
      {
        channel: channelId,
        message: {
          action: 'muteMessage',
          channel: channelId,
          data: {
            umt: id,
            channelToken: channelId,
          },
        },
      }
    );
  }

  receivePollVote (data:LegacyPollVoteType) {
    if (data.slideKind === 'Salvation') {
      const publicChannel = getPublicChannel(this.getState());
      if (salvationMomentExists(this.getState(), publicChannel)) {
        this.storeDispatch(
          // $FlowFixMe
          setSalvations(data.count)
        );
      } else {
        this.storeDispatch(
          // $FlowFixMe
          setSalvations(data.count),
        );
        this.storeDispatch(
          publishSalvation(publicChannel),
        );
      }
    }
  }

  hereNow (id:string) {
    const includeState = getHostChannel(this.getState()) === id;
    this.pubnub.hereNow(
      {
        channels: [id],
        includeState,
      },
      (status, results) => {
        if (results) {
          const { occupants } = results.channels[id];
          const hereNowUsers = occupants.map(user => this.filterUserState(user));
          this.storeDispatch(setHereNow(id, hereNowUsers));
        }
      }
    );
  }

  filterUserState (user:PubnubPresenceEventType) {
    if (user.state) {
      // Only keep available_prayer attribute for now
      const available_prayer = user.state ? user.state.available_prayer : false; // eslint-disable-line camelcase
      return {
        id: user.uuid,
        state: {
          available_prayer: available_prayer, // eslint-disable-line camelcase
        },
      };
    } else {
      return {
        id: user.uuid,
        state: {},
      };
    }
  }

  addChannel = (channelId: string) => {
    this.subscribe([channelId]);
    this.pubnub.history({channel: channelId},
      ((status, response) => {
        if (!status?.error) {
          this.loadHistory(response.messages, channelId);
        } else {
          bugsnagClient.notify(new Error('Pubnub History failed to load'), { metaData: status });
        }
      }).bind(this));

    this.hereNow(channelId);
  }

  dispatch (action: any) {
    if (!action || !action.type) {
      return;
    }
    switch (action.type) {
      case 'SET_USER':
        this.init();
        this.subscribe([action.user.pubnubToken]);
        return;
      case 'SET_PUBNUB_KEYS':
        this.init();
        return;
      case 'SET_LANGUAGE':
      case 'SET_AVATAR':
      case 'SET_AVAILABLE_FOR_PRAYER':
        this.setPubnubState();
        return;
      case 'ADD_CHANNEL':
        if (!action.channel.placeholder) {
          this.addChannel(action.channel.id);
        }
        return;
      case 'PUBLISH_REACTION':
        this.publishReaction(action.reaction, getLegacyChannel(this.getState()));
        return;
      case 'REMOVE_CHANNEL':
        this.unsubscribe([action.channel]);
        return;
      case SET_CHANNELS:
        Object.keys(action.channels).forEach(this.addChannel);
        return;
      case 'PUBLISH_DELETE_MESSAGE': {
        const currentChannel = getCurrentChannel(this.getState());
        this.publishDeleteMessage(action.id, currentChannel);
        return;
      }
    }
  }
}

export default Chat;
export type { PubnubPublishMessageType };
