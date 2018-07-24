/* global Store */
import getReducer, {  } from './dux';
import Chat from './chat';
import ChatEngineCore from 'chat-engine';
import { receiveMoment, addChannel } from '../../feed/dux';

let _store;
const setStore = (store: Store<any>): void => {
  _store = store;
};

const chat = new Chat(
  ChatEngineCore,
  (channel, moment) => _store.dispatch(receiveMoment(channel, moment)),
  (channelName, channelId) => _store.dispatch(addChannel(channelName, channelId))
);

const reducer = getReducer(chat);

export default reducer;
export { setStore };
