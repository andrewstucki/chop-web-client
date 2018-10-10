// @flow
import Pubnub from 'pubnub';
import { Dispatch  } from 'redux';
import type { FeedType, ChannelType } from '../feed/dux';
import type { ReactionType, LegacyReactionType } from '../reactions/reactionButton/dux';
import Converter from './converter';
import type { MomentType } from '../moment/dux';
import { publishPrayerRequestNotification } from '../moment/actionableNotification/dux';
import type { LegacyMessageType } from '../moment/message/dux';
import { getChannelByName } from '../util';

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
    data: MomentType | LegacyReactionType | LegacyMessageType,
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
    this.publish = this.publish.bind(this);
    // $FlowFixMe
    this.publishReaction = this.publishReaction.bind(this);
    // $FlowFixMe
    this.init = this.init.bind(this);
    
    this.storeDispatch = dispatch;
    this.getState = getState;

    this.previousLanguage = null;
  }

  init () {
    const state = this.getState();

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
  }

  setPubnubState (state: any) {
    this.pubnub.setState(
      {
        channels: Object.keys(this.getState().channels),
        state: state,
      }
    );
  }

  setLanguage (languageCode: string) {
    this.setPubnubState (
      {
        language: languageCode,
        prevLanguage: this.previousLanguage,
      },
    );
    this.previousLanguage = languageCode;
  }

  setAvailableForPrayer (status: boolean) {
    this.setPubnubState (
      {
        available_prayer: status, // eslint-disable-line camelcase
      },
    );
  }

  onStatus (event: PubnubStatusEventType) {
    switch (event.category) {
    case 'PNConnectedCategory':
      this.setLanguage(this.getState().currentLanguage);
      this.setAvailableForPrayer(true);
      this.storeDispatch({
        type: 'CHAT_CONNECTED',
      });
      return;
    }
  }

  onMessage (event: PubnubMessageEventType) {
    const { channels } = this.getState();
    let hasMomentBeenRecieved = false;

    switch (event.message.action) {
    case 'newMessage':

      hasMomentBeenRecieved = Object.keys(channels).find(
        id => channels[id].moments.find(
          // $FlowFixMe
          moment => moment.id === event.message.data.msgId));

      if (!hasMomentBeenRecieved) {
        this.storeDispatch(
          {
            type: 'RECEIVE_MOMENT',
            channel: event.channel,
            moment: Converter.legacyToCwc(event.message.data),
          }
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
          publishPrayerRequestNotification(
            { 
              name: event.message.data.fromNickname,
              pubnubToken: event.message.data.fromToken,
              role: { 
                label: '',
              },
            }, 
            getChannelByName(this.getState().channels, 'Host')
          )
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
    this.pubnub.subscribe (
      {
        channels,
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
      } else {
        this.publishNewMessage(action.moment, this.getState().channels[action.channel]);
      }
      return;
    case 'CHAT_CONNECT':
      this.init();
      return;
    case 'SET_LANGUAGE':
      this.setLanguage(action.language);
      return;
    case 'ADD_CHANNEL':
      this.subscribe([action.channel.id]);
      return;
    case 'SET_AVAILABLE_FOR_PRAYER':
      this.setAvailableForPrayer(action.status);
      return;
    case 'PUBLISH_REACTION':
      this.publishReaction(action.reaction, getChannelByName(this.getState().channels, 'Public'));
      return;
    }
  }
}

export default Chat;