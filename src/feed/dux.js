// @flow
import type {
  AddToCurrentChannelAction,
  ChatInputAction,
} from '../chat/dux';

import type { MessageType } from '../components/message/dux';

import type { SetUser } from '../io/chat/dux';

import {
  ADD_TO_CURRENT_CHANNEL,
  CHAT_INPUT,
} from '../chat/dux';

import { createMessage } from '../components/message/dux';

import { SET_USER } from '../io/chat/dux';

// Action Types
const CHANGE_CHANNEL = 'CHANGE_CHANNEL';
const ADD_TO_CHANNEL = 'ADD_TO_CHANNEL';
const ADD_CHANNEL = 'ADD_CHANNEL';
const REMOVE_CHANNEL = 'REMOVE_CHANNEL';

// Flow Type Definitions
type MomentType =
  | MessageType;

type UserType = {
  id: string,
  nickname: string,
};

type FeedType = {
  channels: {
    [string]: Array<MessageType>,
  },
  currentChannel: string,
  chatInput: string,
  currentUser: UserType,
  appendingMessage: boolean,
};

type ChangeChannelType = {
  type: 'CHANGE_CHANNEL',
  channel: string
};

type AddToChannelType = {
  type: 'ADD_TO_CHANNEL',
  channel: string,
  message: MessageType,
};

type AddChannelType = {
  type: 'ADD_CHANNEL',
  channel: string,
};

type RemoveChannelType = {
  type: 'REMOVE_CHANNEL',
  channel: string,
};

type FeedActionTypes =
  | ChangeChannelType
  | AddToCurrentChannelAction
  | AddToChannelType
  | AddChannelType
  | RemoveChannelType
  | ChatInputAction
  | SetUser;

// Action Creators

const changeChannel = (newChannel: string): ChangeChannelType => (
  {
    type: CHANGE_CHANNEL,
    channel: newChannel,
  }
);

const addToChannel = (channel: string, message: MessageType): AddToChannelType => (
  {
    type: ADD_TO_CHANNEL,
    channel,
    message,
  }
);

const addChannel = (channel: string): AddChannelType => (
  {
    type: ADD_CHANNEL,
    channel,
  }
);

const removeChannel = (channel: string): RemoveChannelType => (
  {
    type: REMOVE_CHANNEL,
    channel,
  }
);

// Default State

const defaultState = {
  channels: {
    default: [],
    host: [],
  },
  currentChannel: 'default',
  chatInput: '',
  currentUser: {
    id: '',
    nickname: '',
  },
  appendingMessage: false,
};

// Reducer

const reducer = (
  state: FeedType = defaultState,
  action?: FeedActionTypes): FeedType => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
  case CHANGE_CHANNEL:
    if (!state.channels[action.channel]) {
      return state;
    }
    return {
      ...state,
      appendingMessage: false,
      currentChannel: action.channel,
    };
  case ADD_TO_CURRENT_CHANNEL:
    if ([state.chatInput].toString().length > 0) {
      return {
        ...state,
        appendingMessage: true,
        channels: {
          ...state.channels,
          [state.currentChannel]: [
            ...state.channels[state.currentChannel],
            createMessage(action.id, state.chatInput, state.currentUser, false),
          ],
        },
        chatInput: '',
      };
    }
    return state;
  case ADD_TO_CHANNEL:
    return {
      ...state,
      appendingMessage: true,
      channels: {
        ...state.channels,
        [action.channel]: [
          ...state.channels[action.channel],
          action.message,
        ],
      },
    };
  case ADD_CHANNEL:
    if (state.channels[action.channel]) {
      return state;
    }
    return {
      ...state,
      channels: {
        ...state.channels,
        [action.channel]: [],
      },
    };
  case REMOVE_CHANNEL: {
    if (action.channel === 'default') {
      return state;
    }
    const stateCopy = {...state};
    if (action.channel === state.currentChannel) {
      stateCopy.currentChannel = 'default';
    }
    delete stateCopy.channels[action.channel];
    return stateCopy;
  }
  case CHAT_INPUT: 
    return {
      ...state,
      chatInput: action.value,
    };
  case SET_USER: 
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        id: action.id,
        nickname: action.nickname,
      },
    };
  default:
    return state;
  }
};

// Selectors

const feedContents = (state: FeedType): Array<MessageType> => (
  state.channels[state.currentChannel]
);

const appendMessage = (state: FeedType) => (
  state.appendingMessage
);

// Exports

export {
  CHANGE_CHANNEL,
  ADD_TO_CHANNEL,
  ADD_CHANNEL,
  REMOVE_CHANNEL,
};
export {
  changeChannel,
  addToChannel,
  addChannel,
  removeChannel,
  feedContents,
  defaultState,
  appendMessage,
};
export type {
  MomentType,
  AddToChannelType,
  ChangeChannelType,
  UserType,
  FeedType
};

export default reducer;
