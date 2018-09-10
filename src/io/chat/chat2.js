// @flow
import Pubnub from 'pubnub';
import { Dispatch  } from 'redux';
import type { FeedType, ReactionType } from '../../feed/dux';
import Converter from '../converter';
import type { MomentType } from '../../moment/dux';

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
  message: MomentType | ReactionType,
  publisher: string,
  subscription: string,
  timetoken: string,
}

class Chat {
  pubnub: Pubnub
  storeDispatch: Dispatch
  getState: () => FeedType

  constructor (dispatch: Dispatch, getState: () => FeedType) {
    // $FlowFixMe
    this.onStatus = this.onStatus.bind(this);
    // $FlowFixMe
    this.onMessage = this.onMessage.bind(this);
    // $FlowFixMe
    this.publish = this.publish.bind(this);
    // $FlowFixMe
    this.init = this.init.bind(this);
    
    this.storeDispatch = dispatch;
    this.getState = getState;
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
    this.pubnub.subscribe(
      {
        channels,
      }
    );
  }

  onStatus (event: PubnubStatusEventType) {
    switch (event.category) {
    case 'PNConnectedCategory':
      this.storeDispatch({
        type: 'CHAT_CONNECTED',
      });
      return;
    }
  }

  onMessage (event: PubnubMessageEventType) {
    if (event.message.action === 'newMessage' &&
      event.message.data.fromToken !== this.getState().currentUser.pubnubToken) {
      this.storeDispatch(
        {
          type: 'RECEIVE_MOMENT',
          channel: event.channel,
          moment: Converter.legacyToCwc(event.message.data),
        }
      );
    } else if (event.message.action === 'reaction') {
      this.storeDispatch(
        {
          type: 'RECEIVE_REACTION',
          reaction: {
            type: 'REACTION',
            id: event.message.data.id,
          },
        }
      );
    }
  }

  publish (moment: MomentType, channel: any) {
    this.pubnub.publish(
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

  dispatch (action: any) {
    switch (action.type) {
    case 'PUBLISH_MOMENT_TO_CHANNEL':
      this.publish(action.moment, this.getState().channels[action.channel]);
      return;
    case 'CHAT_CONNECT':
      this.init();
      return;
    }
  }
}

export default Chat;