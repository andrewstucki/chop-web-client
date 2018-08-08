// @flow
import type { Chat } from './chat';
import type {
  PublishMessageAction,
  ChatInputAction,
} from '../../../src/chat/dux';

import type {
  ReceiveMomentType,
  ChangeChannelType,
  AddChannelType,
  InviteToChannelType,
  PrivateUserType,
} from '../../../src/feed/dux';

import type { PublishMomentToChannelType } from '../../../src/moment/dux';

import type { PublishAcceptedPrayerRequestType } from '../../../src/moment/actionableNotification/dux';

import { PUBLISH_MOMENT_TO_CHANNEL } from '../../../src/moment/dux';

import {
  PUBLISH_MESSAGE,
  CHAT_INPUT,
} from '../../../src/chat/dux';

import { createMessage } from '../../../src/moment';

import {
  PUBLISH_ACCEPTED_PRAYER_REQUEST,
  PRAYER_REQUEST,
} from '../../../src/moment/actionableNotification/dux';

import {
  CHANGE_CHANNEL,
  ADD_CHANNEL,
  INVITE_TO_CHANNEL,
} from '../../../src/feed/dux';

// Actions
const SET_CHAT_KEYS = 'SET_CHAT_KEYS';
const SET_USER = 'SET_USER';

// Flow Types

type IOChatState = {
  publishKey: string,
  subscribeKey: string,
  user: PrivateUserType,
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
  user: PrivateUserType,
};


type IOChatActionTypes =
  | SetChatKeys
  | SetUser
  | AddChannelType
  | ChatInputAction
  | PublishMessageAction
  | ReceiveMomentType
  | ChangeChannelType
  | PublishMomentToChannelType
  | InviteToChannelType
  | PublishAcceptedPrayerRequestType;

// Action Creators

const setChatKeys = (publishKey: string, subscribeKey: string): SetChatKeys => (
  {
    type: SET_CHAT_KEYS,
    publishKey,
    subscribeKey,
  }
);

const setUser = (user: PrivateUserType): SetUser => (
  {
    type: SET_USER,
    user,
  }
);

const defaultState = {
  publishKey: '',
  subscribeKey: '',
  user: {
    id: '',
    name: '',
    pubnubToken: '',
    pubnubAccessToken: '',
    role: {
      label: '',
      permissions: [],
    },
  },
  chats: {},
  currentChannel: 'public',
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
      chatIO.setUser(action.user);
      return {
        ...state,
        user: action.user,
      };
    case ADD_CHANNEL:
      chatIO.addChat(action.channel.name, action.channel.id);
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.channel.name]: action.channel.id,
        },
      };
    case PUBLISH_MESSAGE:
      chatIO.publish(
        state.currentChannel,
        createMessage(action.id, state.chatInput, state.user, false));
      return {
        ...state,
        chatInput: '',
      };
    case PUBLISH_MOMENT_TO_CHANNEL: {
      // $FlowFixMe
      const { moment, channel } = action;
      if (moment.notificationType === PRAYER_REQUEST) {
        chatIO.publish('request', moment);
      }
      chatIO.publish(channel, moment);
      return state;
    }
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
    case INVITE_TO_CHANNEL:
      chatIO.inviteToChannel(action.user.pubnubToken, action.channelName);
      return state;
    case PUBLISH_ACCEPTED_PRAYER_REQUEST:
      chatIO.publishAcceptedPrayerRequest(action.id, action.channel);
      return state;
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
  defaultState,
};

export default getReducer;
