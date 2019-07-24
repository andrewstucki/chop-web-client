// @flow
import Cookies from 'js-cookie';
import { type SharedSubscriberType } from '../../subscriber/dux';
import type { PublishMomentToChannelType } from '../dux';
import { PUBLISH_MOMENT_TO_CHANNEL } from '../dux';
import {createUid, newTimestamp} from '../../util';
import type {
  UIDType,
  DateTimeType,
  System,
  MomentNameType,
  LanguageType,
} from '../../cwc-types';

// Action Types

const TOGGLE_MESSAGE_TRAY = 'TOGGLE_MESSAGE_TRAY';
const DELETE_MESSAGE = 'DELETE_MESSAGE';
const MESSAGE = 'MESSAGE';
const DIRECT_CHAT = 'DIRECT_CHAT';
const DIRECT_CHAT_FAILED = 'DIRECT_CHAT_FAILED';
const PUBLISH_DELETE_MESSAGE = 'PUBLISH_DELETE_MESSAGE';

// Flow Type Definitions

type SenderType = System | SharedSubscriberType;

type BaseMomentType<T: MomentNameType, S: SenderType> = {
  id: UIDType,
  sessionId: UIDType | null,
  timestamp: DateTimeType,
  subscriber: S,
  type: T,
};

type MessageType = {
  lang: LanguageType,
  text: string,
  messageTrayOpen: boolean,
  isMuted: boolean,
} & BaseMomentType<typeof MESSAGE, SharedSubscriberType>;

type ToggleMessageTrayType = {
  type: 'TOGGLE_MESSAGE_TRAY',
  channel: string,
  id: string,
};

type DeleteMessageType = {
  type: 'DELETE_MESSAGE',
  id: string,
  channel: string,
};

type PublishDeleteMessageType = {
  type: 'PUBLISH_DELETE_MESSAGE',
  id: string,
};

type PublishDirectChatType = {
  type: typeof DIRECT_CHAT,
  otherSubscriberId: string,
  otherSubscriberNickname: string,
};

// Action Creators

const newMessage = (
  text: string,
  subscriber: SharedSubscriberType,
  lang: LanguageType
): MessageType => (
  {
    type: MESSAGE,
    id: createUid(),
    sessionId: Cookies.get('SESSIONID'),
    timestamp: newTimestamp(),
    lang,
    text,
    subscriber,
    messageTrayOpen: false,
    isMuted: false,
  }
);

const publishMessage = (
  channel: string,
  text: string,
  subscriber: SharedSubscriberType,
  language: string,
): PublishMomentToChannelType => (
  {
    type: PUBLISH_MOMENT_TO_CHANNEL,
    channel,
    moment: newMessage(text, subscriber, language),
  }
);

const toggleMessageTray = (channel: string, id: string): ToggleMessageTrayType => (
  {
    type: TOGGLE_MESSAGE_TRAY,
    channel,
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

const directChat = (otherSubscriberId: string, otherSubscriberNickname: string): PublishDirectChatType => (
  {
    type: DIRECT_CHAT,
    otherSubscriberId,
    otherSubscriberNickname,
  }
);

// Exports

export {
  TOGGLE_MESSAGE_TRAY,
  DELETE_MESSAGE,
  MESSAGE,
  DIRECT_CHAT,
  DIRECT_CHAT_FAILED,
  PUBLISH_DELETE_MESSAGE,
};

export {
  toggleMessageTray,
  deleteMessage,
  publishMessage,
  publishDeleteMessage,
  directChat,
  newMessage,
};

export type {
  MessageType,
  ToggleMessageTrayType,
  DeleteMessageType,
  PublishDeleteMessageType,
  PublishDirectChatType,
};
