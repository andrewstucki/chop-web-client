// @flow
import type { UserType } from '../feed/dux';

// Action Types

const OPEN_MESSAGE_TRAY = 'OPEN_MESSAGE_TRAY';
const CLOSE_MESSAGE_TRAY = 'CLOSE_MESSAGE_TRAY';

// Flow Type Definitions

type MessageType = {
  id: string,
  text: string,
  user: UserType,
  messageTrayOpen: boolean,
};

type OpenMessageTrayType = {
  type: 'OPEN_MESSAGE_TRAY',
  id: string,
};

type CloseMessageTrayType = {
  type: 'CLOSE_MESSAGE_TRAY',
  id: string,
};

type MessageActionTypes =
  | OpenMessageTrayType
  | CloseMessageTrayType;

// Action Creators

const openMessageTray = (id: string) => (
  {
    type: OPEN_MESSAGE_TRAY,
    id,
  }
);

const closeMessageTray = (id: string) => (
  {
    type: CLOSE_MESSAGE_TRAY,
    id,
  }
);

const createMessage = (
  id: string,
  text: string,
  user: UserType,
  messageTrayOpen: boolean
): MessageType => (
  {
    id,
    text,
    user,
    messageTrayOpen,
  }
);

// Reducer

const reducer = (
  state: Object = {},
  action?: MessageActionTypes) => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
  default:
    return state;
  }
};

// Exports

export {
  OPEN_MESSAGE_TRAY,
  CLOSE_MESSAGE_TRAY,
};

export {
  createMessage,
  openMessageTray,
  closeMessageTray,
};

export type {
  MessageType,
  OpenMessageTrayType,
  CloseMessageTrayType,
};

export default reducer;
