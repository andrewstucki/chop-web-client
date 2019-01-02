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
const RECEIVE_MUTE_USER = 'RECEIVE_MUTE_USER';
const PUBLISH_MUTE_USER = 'PUBLISH_MUTE_USER';
const DIRECT_CHAT = 'DIRECT_CHAT';
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

type ReceiveMuteUserType = {
  type: 'RECEIVE_MUTE_USER',
  nickname: string,
};

type PublishMuteUserType = {
  type: 'PUBLISH_MUTE_USER',
  feedToken: string,
  nickname: string,
};

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

const receiveMuteUser = (nickname:string): ReceiveMuteUserType => (
  {
    type: RECEIVE_MUTE_USER,
    nickname,
  }
);

const publishMuteUser = (feedToken:string, nickname:string): PublishMuteUserType => (
  {
    type: PUBLISH_MUTE_USER,
    feedToken,
    nickname,
  }
);

const directChat = (otherUserPubnubToken: string, otherUserNickname: string) => (
  {
    type: DIRECT_CHAT,
    otherUserPubnubToken,
    otherUserNickname,
  }
);

// Exports

export {
  OPEN_MESSAGE_TRAY,
  CLOSE_MESSAGE_TRAY,
  DELETE_MESSAGE,
  TOGGLE_CLOSE_TRAY_BUTTON,
  MESSAGE,
  PUBLISH_MUTE_USER,
  RECEIVE_MUTE_USER,
  DIRECT_CHAT,
  PUBLISH_DELETE_MESSAGE,
};

export {
  openMessageTray,
  closeMessageTray,
  deleteMessage,
  toggleCloseTrayButton,
  publishMessage,
  publishDeleteMessage,
  publishMuteUser,
  receiveMuteUser,
  directChat,
};

export type {
  MessageType,
  OpenMessageTrayType,
  CloseMessageTrayType,
  DeleteMessageType,
  ToggleCloseTrayButtonType,
  PublishMuteUserType,
  ReceiveMuteUserType,
  PublishDeleteMessageType,
};