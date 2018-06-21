/* global Store */
import getReducer, {  } from './dux';
import Chat from './chat';
import ChatEngineCore from 'chat-engine';
import { receiveMessage } from '../../feed/dux';

let _store;
const setStore = (store: Store<any>): void => {
  _store = store;
};

const chat = new Chat(
  ChatEngineCore,
  (channel, message) => _store.dispatch(receiveMessage(channel, message)));

const reducer = getReducer(chat);

export default reducer;
export { setStore };