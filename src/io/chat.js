// @flow
import Pubnub from 'pubnub';
import { Dispatch  } from 'redux';
import {
  removeHereNow,
  updateHereNow,
  setHereNow,
  loadHistory,
  setSalvations,
} from '../feed/dux';
import type { 
  FeedType, 
  ChannelType,
} from '../feed/dux';
import type {
  ReactionType,
} from '../reactions/reactionButton/dux';
import Converter from './converter';
import type { MomentType } from '../moment/dux';
import { receiveMoment } from '../moment/dux';
import { receiveAcceptedPrayerRequest } from '../moment/actionableNotification/dux';
import {
  receiveJoinedChatNotification,
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
import { getCurrentUser } from '../selectors/chatSelectors';
import type {
  PubnubReciveMessageType,
  LegacyNewMessageType,
} from './converter';

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
    this.publishLeaveChannel = this.publishLeaveChannel.bind(this);
    // $FlowFixMe
    this.publishDeleteMessage = this.publishDeleteMessage.bind(this);
    // $FlowFixMe
    this.publishMuteUser = this.publishMuteUser.bind(this);
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

    const publicChannel = getPublicChannel(this.getState());
    this.pubnub.hereNow(
      {
        channels: [publicChannel],
        includeState: true,
      },
      (status, results) => {
        if (results) {
          const users = results.channels[publicChannel].occupants;
          const hereNowUsers = {};
          users.forEach(user => {
            const available_prayer = user.state ? user.state.available_prayer : false; // eslint-disable-line camelcase
            hereNowUsers[user.uuid] = {
              available_prayer: available_prayer, // eslint-disable-line camelcase
            };
          });
          this.storeDispatch(setHereNow(publicChannel, hereNowUsers));
        }
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
    this.pubnub.setState(
      {
        channels: Object.keys(this.getState().channels),
        state: {
          available_help: true, // eslint-disable-line camelcase
          available_prayer: true, // eslint-disable-line camelcase
          avatarUrl: this.getState().currentUser.avatarUrl,
          clientIp: '205.236.56.99',
          country_name: 'United States', // eslint-disable-line camelcase
          lat: 35.6500,
          lon: -97.4214,
          nickname: this.getState().currentUser.name,
          userId: null,
          language: this.getState().currentLanguage,
        },
      }
    );
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
    const available_prayer = event.state ? event.state.available_prayer : false; // eslint-disable-line camelcase
    const publicChannel = getPublicChannel(this.getState());
    const hostChannel = getHostChannel(this.getState());
    const currentUser = getCurrentUser(this.getState());

    const name = event?.state?.nickname === currentUser.name ? 'You' : event?.state?.nickname;

    if (channel === publicChannel) {
      switch (action) {
        case 'join':
        case 'state-change':
          this.storeDispatch(
            updateHereNow(
              uuid,
              channel,
              {
                available_prayer: available_prayer, // eslint-disable-line camelcase
              }
            )
          );
          break;
        case 'timeout':
        case 'leave':
          this.storeDispatch(
            removeHereNow(uuid, channel)
          );
          break;
      }
    } else if (channel !== hostChannel && name) {
      this.storeDispatch(receiveJoinedChatNotification(name, channel));
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
      case 'muteMessage':
      // $FlowFixMe
        if (this.getState().channels[event.message.data.channelToken].moments.find(moment => moment.id === event.message.data.umt) !== undefined) {
          this.storeDispatch(
          // $FlowFixMe
            deleteMessage(event.message.data.umt, event.message.data.channelToken)
          );
        }
        return;
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
    }
  }

  publish (message:PubnubPublishMessageType) {
    this.pubnub.publish(
      message
    );
  }

  publishNewMessage (moment:MomentType, channel: ChannelType) {
    this.publish(
      {
        channel: channel.id,
        message: {
          action: 'newMessage',
          channel: channel.id,
          data: Converter.cwcMessageToLegacyNewMessage(moment, channel.id),
        },
      }
    );
  }

  publishSystemMessage (moment:MomentType, channelId: string) {
    this.publish(
      {
        channel: channelId,
        message: {
          action: 'systemMessage',
          channel: channelId,
          data: Converter.cwcToLegacySystemMessage(moment),
        },
      }
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

  publishLeaveChannel (moment: MomentType, channelId: string) {
    this.publish(
      {
        channel: channelId,
        message: {
          action: 'newMessage',
          channel: channelId,
          data: Converter.cwcToLegacyLeaveChannel(moment, channelId),
        },
      }
    );
  }

  publishMuteUser (moment: MomentType, channelId: string) {
    this.publish(
      {
        channel: channelId,
        message: {
          action: 'muteUser',
          channel: channelId,
          data: Converter.cwcToLegacyMuteUser(moment),
        },
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

  dispatch (action: any) {
    if (!action || !action.type) {
      return;
    }
    switch (action.type) {
      case 'PUBLISH_MOMENT_TO_CHANNEL':
      
        if (action.moment.type === 'NOTIFICATION' && action.moment.notificationType === 'PRAYER') {
          this.publishSystemMessage(action.moment, action.channel);
        } else if (action.moment.type === 'NOTIFICATION' && action.moment.notificationType === 'LEFT_CHANNEL') {
          this.publishLeaveChannel(action.moment, action.channel);
        } else if (action.moment.type === 'NOTIFICATION' && action.moment.notificationType === 'MUTE') {
          this.publishMuteUser(action.moment, action.channel);
        } else {
          this.publishNewMessage(action.moment, this.getState().channels[action.channel]);
        }
        return;
      case 'SET_USER':
      case 'SET_PUBNUB_KEYS':
        this.init();
        return;
      case 'SET_LANGUAGE':
      case 'SET_AVATAR':
      case 'SET_AVAILABLE_FOR_PRAYER':
        this.setPubnubState();
        return;
      case 'ADD_CHANNEL': {
        const { id } = action.channel;
        this.subscribe([id]);
        this.pubnub.history({channel: id},
          ((status, response) => {
            this.loadHistory(response.messages, id);
          }).bind(this));
        return;
      }
      case 'PUBLISH_REACTION':
        this.publishReaction(action.reaction, getLegacyChannel(this.getState()));
        return;
      case 'REMOVE_CHANNEL': 
        this.unsubscribe([action.channel]);
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
