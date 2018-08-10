// @flow
/* global Store */
import ChatEngineCore from 'chat-engine';

import getReducer from './dux';

import {
  receiveMoment,
  addChannel,
  receiveAcceptedPrayerRequest,
} from '../../feed/dux';

import Chat from './chat';

let _store;
// $FlowFixMe
const setStore = (store: Store<any>): void => {
  _store = store;
};

const chat = new Chat(
  ChatEngineCore,
  (channel, moment) => _store.dispatch(receiveMoment(channel, moment)),
  (channelName, channelId, participants?) =>
    _store.dispatch(addChannel(channelName, channelId, participants)),
  id => _store.dispatch(receiveAcceptedPrayerRequest(id))
);

const reducer = getReducer(chat);

export { setStore };

export default reducer;
