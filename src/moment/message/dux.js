// @flow
import type { SharedUserType } from '../../feed/dux';
import type { PublishMomentToChannelType } from '../dux';
import { PUBLISH_MOMENT_TO_CHANNEL } from '../dux';
import { createUid } from '../../util';

// Action Types

const OPEN_MESSAGE_TRAY = 'OPEN_MESSAGE_TRAY';
const CLOSE_MESSAGE_TRAY = 'CLOSE_MESSAGE_TRAY';
const DELETE_MESSAGE = 'DELETE_MESSAGE';
const TOGGLE_CLOSE_TRAY_BUTTON = 'TOGGLE_CLOSE_TRAY_BUTTON';
const MESSAGE = 'MESSAGE';
const MUTE_USER = 'MUTE_USER';
const PUBLISH_DELETE_MESSAGE = 'PUBLISH_DELETE_MESSAGE';

// Flow Type Definitions

type MessageType = {
  type: 'MESSAGE',
  id: string,
  lang: string,
  text: string,
  user: SharedUserType,
  messageTrayOpen: boolean,
  closeTrayButtonRendered: boolean,
};

type LegacyMessageType = {
  messageText: string,
  language: string,
  eventTimeId: string,
  eventTimeOffset: string,
  eventTitle: string,
  uniqueMessageToken: string,
  fromNickname: string,
  fromToken: string,
  msgId: string,
  timestamp: string,
  fromAvatar: string,
  isHost: boolean,
  label: string,
  isVolunteer: boolean,
  isUser: boolean,
  userId: string,
  organizationId: string,
  organizationName: string,
  roomType: string,
  channelToken: string,
  eventStartTime: string,
};

type LegacyDeleteMessageType = {
  umt: string,
  channelToken: string,
}

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
  channel: string,
};

type ToggleCloseTrayButtonType = {
  type: 'TOGGLE_CLOSE_TRAY_BUTTON',
  id: string,
};

type MuteUserType = {
  type: 'MUTE_USER',
  pubnubToken: string,
}

type PublishDeleteMessageType = {
  type: 'PUBLISH_DELETE_MESSAGE',
  id: string,
}

// Action Creators

const publishMessage = (
  channel: string,
  text: string,
  user: SharedUserType
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

const deleteMessage = (id:string, channel:string): DeleteMessageType => (
  {
    type: DELETE_MESSAGE,
    id,
    channel,
  }
);

const publishDeleteMessage = (id:string): PublishDeleteMessageType => (
  {
    type: PUBLISH_DELETE_MESSAGE,
    id,
  }
);

const muteUser = (pubnubToken:string): MuteUserType => (
  {
    type: MUTE_USER,
    pubnubToken,
  }
);

// Exports

export {
  OPEN_MESSAGE_TRAY,
  CLOSE_MESSAGE_TRAY,
  DELETE_MESSAGE,
  TOGGLE_CLOSE_TRAY_BUTTON,
  MESSAGE,
  MUTE_USER,
  PUBLISH_DELETE_MESSAGE,
};

export {
  openMessageTray,
  closeMessageTray,
  deleteMessage,
  toggleCloseTrayButton,
  publishMessage,
  publishDeleteMessage,
  muteUser,
};

export type {
  MessageType,
  OpenMessageTrayType,
  CloseMessageTrayType,
  DeleteMessageType,
  LegacyDeleteMessageType,
  ToggleCloseTrayButtonType,
  LegacyMessageType,
  MuteUserType,
  PublishDeleteMessageType,
};
