// @flow
import type { Chat } from './chat';

import type {
  ReceiveMomentType,
  ChangeChannelType,
  AddChannelType,
  InviteToChannelType,
  RemoveChannelType,
} from '../../../src/feed/dux';

import type { PublishMomentToChannelType } from '../../../src/moment/dux';

import type { PublishAcceptedPrayerRequestType } from '../../../src/moment/actionableNotification/dux';

import { PUBLISH_MOMENT_TO_CHANNEL } from '../../../src/moment/dux';

import {
  PUBLISH_ACCEPTED_PRAYER_REQUEST,
  PRAYER_REQUEST,
} from '../../../src/moment/actionableNotification/dux';

import {
  CHANGE_CHANNEL,
  ADD_CHANNEL,
  INVITE_TO_CHANNEL,
  REMOVE_CHANNEL,
} from '../../../src/feed/dux';

// Actions
const SET_CHAT_KEYS = 'SET_CHAT_KEYS';
const SET_USER = 'SET_USER';

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


type IOChatActionTypes =
  | SetChatKeys
  | SetUser
  | AddChannelType
  | ReceiveMomentType
  | ChangeChannelType
  | PublishMomentToChannelType
  | InviteToChannelType
  | PublishAcceptedPrayerRequestType
  | RemoveChannelType;

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

const defaultState = {
  publishKey: '',
  subscribeKey: '',
  user: {
    id: '',
    nickname: '',
  },
  chats: {},
  currentChannel: 'public',
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
    case ADD_CHANNEL:
      chatIO.addChat(action.channel.name, action.channel.id);
      return {
        ...state,
        chats: {
          ...state.chats,
          [action.channel.name]: action.channel.id,
        },
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
    case CHANGE_CHANNEL:
      if (!state.chats[action.channel]) {
        return state;
      }
      return {
        ...state,
        currentChannel: action.channel,
      };
    case INVITE_TO_CHANNEL:
      chatIO.inviteToChannel(action.user.id, action.channelName);
      return state;
    case PUBLISH_ACCEPTED_PRAYER_REQUEST:
      chatIO.publishAcceptedPrayerRequest(action.id, action.channel);
      return state;
    case REMOVE_CHANNEL: {
      if (action.channel === 'public' ||
        action.channel === 'host' || 
        action.channel === 'request' || 
        action.channel === 'command'
      ) {
        return state;
      }
      const stateCopy = { ...state };
      if (action.channel === state.currentChannel) {
        if (state.chats.public) {
          stateCopy.currentChannel = 'public';
        } else {
          stateCopy.currentChannel = '';
        }
      }
      delete stateCopy.chats[action.channel];
      return stateCopy;
    }
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
