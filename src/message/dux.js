// @flow
import type { UserType } from '../feed/dux';

// Action Types

const OPEN_MESSAGE_TRAY = 'OPEN_MESSAGE_TRAY';

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

type MessageActionTypes =
  | OpenMessageTrayType;

// Action Creators

const openMessageTray = (id: string) => (
  {
    type: OPEN_MESSAGE_TRAY,
    id,
  }
);

// Action Creators

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
};

export {
  createMessage,
  openMessageTray,
};

export type {
  MessageType,
  OpenMessageTrayType,
};

export default reducer;
