// @flow
import type { UserType } from '../../feed/dux';

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
  | OpenMessageTrayType;

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
  case OPEN_MESSAGE_TRAY: 
    return {
      ...state,
      messageTrayOpen: true,
    };
  default:
    return state;
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
