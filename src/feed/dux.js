// @flow
import type { MessageType, AddToCurrentChannelAction, ChatInputAction } from '../chat/dux';
import type { SetUser } from '../io/chat/dux';
import { ADD_TO_CURRENT_CHANNEL, CHAT_INPUT, createMessage } from '../chat/dux';
import { SET_USER } from '../io/chat/dux';

// Action Types
const CHANGE_CHANNEL = 'CHANGE_CHANNEL';
const ADD_TO_CHANNEL = 'ADD_TO_CHANNEL';
const ADD_CHANNEL = 'ADD_CHANNEL';
const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
const UPDATE_OFFSET = 'UPDATE_OFFSET';

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
  currentUser: UserType
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

type UpdateOffset = {
  type: 'UPDATE_OFFSET',
  offset: number,
  id: string,
};

type FeedActionTypes =
  | ChangeChannelType
  | AddToCurrentChannelAction
  | AddToChannelType
  | AddChannelType
  | RemoveChannelType
  | UpdateOffset
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

const updateOffset = (offset: number, id:string): UpdateOffset => (
  {
    type: UPDATE_OFFSET,
    offset,
    id,
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
      currentChannel: action.channel,
    };
  case ADD_TO_CURRENT_CHANNEL:
    return {
      ...state,
      channels: {
        ...state.channels,
        [state.currentChannel]: [
          ...state.channels[state.currentChannel],
          createMessage(action.id, state.chatInput),
        ],
      }
    };
  case ADD_TO_CHANNEL:
    return {
      ...state,
      channels: {
        ...state.channels,
        [action.channel]: [
          ...state.channels[action.channel],
          createMessage(action.message.id, action.message.message),
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
        [action.channel]: {messages: [], offset: 0},
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
      user: {
        ...state.user,
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

// Exports

export {
  CHANGE_CHANNEL,
  ADD_TO_CHANNEL,
  ADD_CHANNEL,
  REMOVE_CHANNEL,
  UPDATE_OFFSET,
};
export {
  changeChannel,
  addToChannel,
  addChannel,
  removeChannel,
  feedContents,
  updateOffset,
  defaultState,
};
export type {
  MomentType,
  AddToChannelType,
  ChangeChannelType,
  UserType,
};

export default reducer;
