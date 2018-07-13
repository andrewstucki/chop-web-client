// @flow
import type { UserType } from '../../feed/dux';

// Action Types

const OPEN_MESSAGE_TRAY = 'OPEN_MESSAGE_TRAY';
const CLOSE_MESSAGE_TRAY = 'CLOSE_MESSAGE_TRAY';
const DELETE_MESSAGE = 'DELETE_MESSAGE';
const TOGGLE_CLOSE_TRAY_BUTTON = 'TOGGLE_CLOSE_TRAY_BUTTON';

const MESSAGE = 'MESSAGE';

// Flow Type Definitions

type MessageType = {
  type: 'MESSAGE',
  id: string,
  text: string,
  user: UserType,
  messageTrayOpen: boolean,
  closeTrayButtonRendered: boolean,
};

type OpenMessageTrayType = {
  type: 'OPEN_MESSAGE_TRAY',
  id: string,
};

type CloseMessageTrayType = {
  type: 'CLOSE_MESSAGE_TRAY',
  id: string,
};

type DeleteMessageType = {
  type: 'DELETE_MESSAGE',
  id: string,
};

type ToggleCloseTrayButtonType = {
  type: 'TOGGLE_CLOSE_TRAY_BUTTON',
  id: string,
};

type MessageActionTypes =
  | OpenMessageTrayType
  | CloseMessageTrayType
  | DeleteMessageType;

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

const toggleCloseTrayButton = (id: string) => (
  {
    type: TOGGLE_CLOSE_TRAY_BUTTON,
    id,
  }
);

const createMessage = (
  id: string,
  text: string,
  user: UserType,
  messageTrayOpen: boolean,
  closeTrayButtonRendered: boolean
): MessageType => (
  {
    type: MESSAGE,
    id,
    text,
    user,
    messageTrayOpen,
    closeTrayButtonRendered,
  }
);

const deleteMessage = (id:string) => (
  {
    type: DELETE_MESSAGE,
    id,
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
  DELETE_MESSAGE,
  TOGGLE_CLOSE_TRAY_BUTTON,
  MESSAGE,
};

export {
  createMessage,
  openMessageTray,
  closeMessageTray,
  deleteMessage,
  toggleCloseTrayButton,
};

export type {
  MessageType,
  OpenMessageTrayType,
  CloseMessageTrayType,
  DeleteMessageType,
  ToggleCloseTrayButtonType,
};
export default reducer;
