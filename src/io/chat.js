// @flow
import Pubnub from 'pubnub';
import { Dispatch  } from 'redux';
import type { FeedType, ChannelType } from '../feed/dux';
import { leaveChannel, loadHistory } from '../feed/dux';
import type { ReactionType, LegacyReactionType } from '../reactions/reactionButton/dux';
import Converter from './converter';
import type { MomentType } from '../moment/dux';
import { receiveMoment } from '../moment/dux';
import { receiveLeftChannelNotification, receiveMuteUserNotification } from '../moment/notification/dux';
import type { LegacyMessageType, LegacyDeleteMessageType, LegacyMuteUserType, LegacyLeaveChannelType } from '../moment/message/dux';
import { deleteMessage } from '../moment/message/dux';
import {
  getLegacyChannel,
  getHostChannel,
} from '../selectors/channelSelectors';

type PubnubStatusEventType = {
  affectedChannelGroups: Array<string>,
  affectedChannels: Array<string>,
  subscribedChannels: Array<string>,
  category: string,
  operation: string,
  lastTimetoken: string,
  currentTimetoken: string,
}

type PubnubMessageEventType = {
  channel: string,
  message: {
    action: string,
    data: MomentType | LegacyReactionType | LegacyMessageType | LegacyDeleteMessageType | LegacyMuteUserType | LegacyLeaveChannelType,
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
  pubnub: Pubnub
  storeDispatch: Dispatch
  getState: () => FeedType
  previousLanguage: string | null;

  constructor (dispatch: Dispatch, getState: () => FeedType) {
    // $FlowFixMe
    this.onStatus = this.onStatus.bind(this);
    // $FlowFixMe
    this.onMessage = this.onMessage.bind(this);
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
      }
    );

    const channels = Object.keys(state.channels)
      .map(name => state.channels[name].id);

    this.subscribe(channels);

    channels.map(channel => this.pubnub.history({
      channel: channel,
    }, 
    ((status, response) => {
      this.loadHistory(response.messages, channel);
    }).bind(this)));
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
    messages.map(message => {
      switch (message.entry.action) {
      case 'newMessage':
        if (message.entry.type === 'system') {
          moments.push(receiveLeftChannelNotification(message.entry.fromNickname, message.entry.channelToken, message.entry.cwcTimestamp).moment);
        } else {
          moments.push(Converter.legacyToCwc(message.entry.data));
        }
        return;
      case 'newLiveResponseRequest':
        if (message.entry.data.type === 'prayer') {
          moments.push(Converter.legacyToCwcPrayer(message.entry));
        }
        return;
      case 'muteUser':
        moments.push(
          receiveMuteUserNotification(
            message.entry.data.fromNickname,
            message.entry.data.nickname,
            getHostChannel(this.getState()),
            message.entry.data.cwcTimestamp
          ).moment);
        return;
      }
    });
    this.storeDispatch(
      loadHistory(moments, channel)
    );
  }

  onMessage (event: PubnubMessageEventType) {
    const { channels } = this.getState();
    let hasMomentBeenRecieved = false;
    switch (event.message.action) {
    case 'newMessage': {
      const message = event.message.data;
      if (message.type === 'system') {
        this.storeDispatch(
          // $FlowFixMe
          leaveChannel(message.userId, message.channelToken),
          // $FlowFixMe
          receiveLeftChannelNotification(message.fromNickname, message.channelToken, message.cwcTimestamp),
        );
      } else {
        hasMomentBeenRecieved = Object.keys(channels).find(
          id => channels[id].moments.find(
            // $FlowFixMe
            moment => moment.id === event.message.data.msgId));

        if (!hasMomentBeenRecieved) {
          const moment = Converter.legacyToCwc(event.message.data);

          if (moment.text) {
            this.storeDispatch(
              receiveMoment(event.channel, Converter.legacyToCwc(event.message.data))
            );
          }
        }
      }
      return;
    }
    case 'muteUser': 
      // $FlowFixMe
      if (this.getState().currentUser.name !== event.message.data.fromNickname) {
        this.storeDispatch(
          // $FlowFixMe
          receiveMuteUserNotification(
            // $FlowFixMe
            event.message.data.fromNickname,
            // $FlowFixMe
            event.message.data.nickname,
            // $FlowFixMe
            getHostChannel(this.getState()),
            // $FlowFixMe
            event.message.data.cwcTimestamp
          )
        );
      }
      return;
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
          data: Converter.cwcToLegacy(moment, channel.id),
        },
      }
    );
  }

  publishSystemMessage (moment:MomentType, channel: ChannelType) {
    this.publish(
      {
        channel: channel.id,
        message: {
          action: 'systemMessage',
          channel: channel.id,
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

  dispatch (action: any) {
    if (!action || !action.type) {
      return;
    }
    switch (action.type) {
    case 'PUBLISH_MOMENT_TO_CHANNEL':
      if (action.moment.type === 'NOTIFICATION' && action.moment.notificationType === 'PRAYER') {
        this.publishSystemMessage(action.moment, this.getState().channels[action.channel]);
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
    case 'ADD_CHANNEL':
      this.subscribe([action.channel.id]);
      return;
    case 'PUBLISH_REACTION':
      this.publishReaction(action.reaction, getLegacyChannel(this.getState()));
      return;
    case 'REMOVE_CHANNEL': 
      this.unsubscribe([action.channel]);
      return;
    case 'PUBLISH_DELETE_MESSAGE':
      this.publishDeleteMessage(action.id, this.getState().currentChannel);
    }
  }
}

export default Chat;
