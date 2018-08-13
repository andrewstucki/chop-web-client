// @flow
import Pubnub from 'pubnub';
import { Dispatch  } from 'redux';
import type { FeedType } from '../../feed/dux';
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
  message: MomentType,
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
    
    this.storeDispatch = dispatch;
    this.getState = getState;
    const state = getState();

    Converter.config(getState);

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
    switch (event.message.type) {
    case 'MESSAGE':
      this.storeDispatch(
        {
          type: 'RECEIVE_MOMENT',
          moment: event.message,
        }
      );
    }
  }

  publish (moment: MomentType, channelName: string) {
    this.pubnub.publish(
      {
        channel: channelName,
        message: Converter.cwcToLegacy(moment, channelName),
      }
    );
  }

  dispatch (action: any) {
    switch (action.type) {
    case 'PUBLISH_MOMENT':
      this.publish(action.moment, action.channel);
      return;
    }
  }
}

export default Chat;