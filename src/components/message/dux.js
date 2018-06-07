// @flow
import type { UserType, FeedType } from '../../feed/dux';
import type { AddToCurrentChannelAction } from '../../chat/dux';
import { ADD_TO_CURRENT_CHANNEL } from '../../chat/dux';

// Action Types

const OPEN_MESSAGE_TRAY = 'OPEN_MESSAGE_TRAY';

// Flow Type Definitions

type MessageType = {
  id: string,
  message: string,
  user: UserType,
  messageTrayOpen: boolean,
};

type OpenMessageTrayType = {
  type: 'OPEN_MESSAGE_TRAY',
};

type MessageActionTypes =
  | OpenMessageTrayType
  | AddToCurrentChannelAction;

// Action Creators

const openMessageTray = () => (
  {
    type: OPEN_MESSAGE_TRAY,
  }
);

// Default State

const defaultState = {
  id: '',
  message: '',
  user: {
    id: '',
    nickname: '',
  },
  messageTrayOpen: false,
};

// Action Creators

const createMessage = (
  id: string,
  message: string,
  user: UserType,
  messageTrayOpen: boolean
): MessageType => (
  {
    id,
    message,
    user,
    messageTrayOpen,
  }
);

const reducer = (
  state: MessageType = defaultState,
  action?: MessageActionTypes): MessageType => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
    default:
      return state;
  case OPEN_MESSAGE_TRAY: 
    return {
      ...state,
      messageTrayOpen: true,
    };
  }
};

// Selectors

const getTrayStatus = (state: MessageType) => (
  state.messageTrayOpen
);

// Exports

export {
  defaultState,
  createMessage,
  openMessageTray,
  getTrayStatus,
};

export type {
  MessageType,
};

export default reducer;
