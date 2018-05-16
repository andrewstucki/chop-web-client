// @flow
import type { Chat } from './chat';

// Actions
const SET_CHAT_KEYS = 'SET_CHAT_KEYS';

// Flow Types

type IOChatState = {

};

type SetChatKeys = {
  type: 'SET_CHAT_KEYS',
  publishKey: string,
  subscribeKey: string,
}

type IOChatActionTypes =
  | SetChatKeys;

// Action Creators

const setChatKeys = (publishKey: string, subscribeKey: string) => (
  {
    type: SET_CHAT_KEYS,
    publishKey,
    subscribeKey,
  }
);

const getReducer = (chatIO: Chat) => (
  (state: IOChatState, action: IOChatActionTypes) => {
    if (!action || !action.type) {
      return state;
    }
    switch (action.type) {
    case SET_CHAT_KEYS:
      chatIO.setKeys(action.publishKey, action.subscribeKey);
      return state;
    default:
      return state;
    }
  }
);

export default getReducer;
export { setChatKeys };