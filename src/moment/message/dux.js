// @flow
import type { UserType } from '../../feed/dux';
import type { PublishMomentToChannelType } from '../dux';
import { PUBLISH_MOMENT_TO_CHANNEL } from '../dux';
import { createUid } from '../../util';

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
  | DeleteMessageType
  | ToggleCloseTrayButtonType;

// Action Creators

const publishMessage = (
  channel: string,
  text: string,
  user: UserType
): PublishMomentToChannelType => (
  {
    type: PUBLISH_MOMENT_TO_CHANNEL,
    channel,
    moment: {
      type: MESSAGE,
      id: createUid(),
      text,
      user,
      messageTrayOpen: false,
      closeTrayButtonRendered: false,
    },
  }
);

const openMessageTray = (id: string): OpenMessageTrayType => (
  {
    type: OPEN_MESSAGE_TRAY,
    id,
  }
);

const closeMessageTray = (id: string): CloseMessageTrayType => (
  {
    type: CLOSE_MESSAGE_TRAY,
    id,
  }
);

const toggleCloseTrayButton = (id: string): ToggleCloseTrayButtonType => (
  {
    type: TOGGLE_CLOSE_TRAY_BUTTON,
    id,
  }
);

const deleteMessage = (id:string): DeleteMessageType => (
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
  openMessageTray,
  closeMessageTray,
  deleteMessage,
  toggleCloseTrayButton,
  publishMessage,
};

export type {
  MessageType,
  OpenMessageTrayType,
  CloseMessageTrayType,
  DeleteMessageType,
  ToggleCloseTrayButtonType,
};
export default reducer;
