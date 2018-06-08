// @flow
import type { Chat } from './chat';
import type {
  AddToCurrentChannelAction,
  ChatInputAction,
} from '../../../src/chat/dux';

import type {
  AddToChannelType,
  ChangeChannelType,
} from '../../../src/feed/dux';

import {
  ADD_TO_CURRENT_CHANNEL,
  CHAT_INPUT,
} from '../../../src/chat/dux';
import { createMessage } from '../../../src/components/message/dux';
import { CHANGE_CHANNEL } from '../../../src/feed/dux';

// Actions
const SET_CHAT_KEYS = 'SET_CHAT_KEYS';
const SET_USER = 'SET_USER';
const ADD_CHAT = 'ADD_CHAT';

// Flow Types

type IOChatState = {
  publishKey: string,
  subscribeKey: string,
  user: {
    id: string,
    nickname: string,
  },
  chats: {
    [string]: string,
  },
  currentChannel: string,
  chatInput: string,
};

type SetChatKeys = {
  type: 'SET_CHAT_KEYS',
  publishKey: string,
  subscribeKey: string,
};

type SetUser = {
  type: 'SET_USER',
  id: string,
  nickname: string,
};

type AddChat = {
  type: 'ADD_CHAT',
  channelId: string,
  channelToken: string,
};

type IOChatActionTypes =
  | SetChatKeys
  | SetUser
  | AddChat
  | ChatInputAction
  | AddToCurrentChannelAction
  | AddToChannelType
  | ChangeChannelType;

// Action Creators

const setChatKeys = (publishKey: string, subscribeKey: string): SetChatKeys => (
  {
    type: SET_CHAT_KEYS,
    publishKey,
    subscribeKey,
  }
);

const setUser = (id: string, nickname: string): SetUser => (
  {
    type: SET_USER,
    id,
    nickname,
  }
);

const addChat = (channelId: string, channelToken: string): AddChat => (
  {
    type: ADD_CHAT,
    channelId,
    channelToken,
  }
);

const defaultState = {
  publishKey: '',
  subscribeKey: '',
  user: {
    id: '',
    nickname: '',
  },
  chats: {},
  currentChannel: 'default',
  chatInput: '',
};

const getReducer = (chatIO: Chat) => (
  (
    state: IOChatState = defaultState,
    action: IOChatActionTypes
  ) => {
    if (!action || !action.type) {
      return state;
    }
    switch (action.type) {
    case SET_CHAT_KEYS:
      chatIO.setKeys(action.publishKey, action.subscribeKey);
      return {
        ...state,
        publishKey: action.publishKey,
        subscribeKey: action.subscribeKey,
      };
    case SET_USER:
      chatIO.setUser(action.id, action.nickname);
      return {
        ...state,
        user: {
          ...state.user,
          id: action.id,
          nickname: action.nickname,
        },
      };
    case ADD_CHAT:
      chatIO.addChat(action.channelId, action.channelToken);
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.channelId]: action.channelToken,
        },
      };
    case ADD_TO_CURRENT_CHANNEL:
      chatIO.publish(
        state.currentChannel,
        createMessage(action.id, state.chatInput, state.user, false));
      return {
        ...state,
        chatInput: '',
      };
    case CHAT_INPUT:
      return {
        ...state,
        chatInput: action.value,
      };
    case CHANGE_CHANNEL:
      if (!state.chats[action.channel]) {
        return state;
      }
      return {
        ...state,
        currentChannel: action.channel,
      };
    default:
      return state;
    }
  }
);
// Exports

export type {
  SetUser,
};

export {
  SET_USER,
};

export {
  setChatKeys,
  setUser,
  addChat,
};

export default getReducer;
