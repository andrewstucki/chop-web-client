// @flow
import { UPDATE_INPUT, ADD_MESSAGE_TO_CHANNEL } from './action-types';
import type { ChatActions } from './action-creators';

type MessageType = {
  id: string,
  user: string,
  message: string
}

type MessagesType = [ MessageType ];

type ChatState = {
  currentInput: string,
  currentChannel: string,
  channels: {
    [string]: MessagesType
  }
}

const defaultState = {
  currentInput: "",
  currentChannel: "",
  channels: {}
}

const reducer = (state: ChatState = defaultState, action?: ChatActions): ChatState => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
  case UPDATE_INPUT:
    return {
            ...state,
            currentInput: action.value.substring(0, 100)
            };
  case ADD_MESSAGE_TO_CHANNEL:
    return state;
  default:
    return state;
  }
};

export default reducer;
export type { MessageType, MessagesType, ChatState }