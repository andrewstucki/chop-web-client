// @flow
import Pubnub from 'pubnub';
import { Dispatch  } from 'redux';
import type { FeedType } from '../../feed/dux';

class Chat {
  pubnub: Pubnub
  storeDispatch: Dispatch
  getState: () => FeedType

  constructor (dispatch: Dispatch, getState: () => FeedType) {
    const state = getState();
    this.pubnub = new Pubnub(
      {
        publishKey: state.pubnubKeys.publish,
        subscribeKey: state.pubnubKeys.subscribe,
        authKey: state.currentUser.pubnubAccessKey,
        uuid: state.currentUser.pubnubToken,
      }
    );
    this.storeDispatch = dispatch;
    this.getState = getState;
  }
}

export default Chat;