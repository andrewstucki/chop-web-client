// @flow
import type { MessageType, AddToCurrentChannelAction, ChatInputAction} from '../chat/dux';
import { ADD_TO_CURRENT_CHANNEL, CHAT_INPUT, createUid, createMessage} from '../chat/dux';

// Action Types
const CHANGE_CHANNEL = 'CHANGE_CHANNEL';
const ADD_TO_CHANNEL = 'ADD_TO_CHANNEL';
const ADD_CHANNEL = 'ADD_CHANNEL';
const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
const UPDATE_OFFSET = 'UPDATE_OFFSET';

// Flow Type Definitions
type MomentType =
  | MessageType

type FeedType = {
  channels: {
    [string]: Array<MomentType>
  },
  currentChannel: string,
  offset: number,
  chatInput: string,
};

type ChangeChannelType = {
  type: 'CHANGE_CHANNEL',
  channel: string
};

type AddToChannelType = {
  type: 'ADD_TO_CHANNEL',
  id: string,
  channel: string,
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
};

type FeedActionTypes =
  | ChangeChannelType
  | AddToCurrentChannelAction
  | AddToChannelType
  | AddChannelType
  | RemoveChannelType
  | UpdateOffset
  | ChatInputAction

// Action Creators

const changeChannel = (newChannel: string): ChangeChannelType => (
  {
    type: CHANGE_CHANNEL,
    channel: newChannel,
  }
);

const addToChannel = (channel: string): AddToChannelType => (
  {
    type: ADD_TO_CHANNEL,
    channel,
    id: createUid(),
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
  offset: 0,
  chatInput: '',
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
  case UPDATE_OFFSET: {
    const stateCopy = { ...state };
    stateCopy.offset += action.offset;
    stateCopy.channels[state.currentChannel].find(elem => elem.id === action.id).neverRendered = false;
    return {
      ...state,
      offset: state.offset + action.offset,
    };
  }
  case ADD_TO_CURRENT_CHANNEL:
    return {
      ...state,
      channels: {
        ...state.channels,
        [state.currentChannel]: [
          ...state.channels[state.currentChannel],
          createMessage(action.id, state.chatInput),
        ],
      },
    };
  case ADD_TO_CHANNEL:
    return {
      ...state,
      channels: {
        ...state.channels,
        [action.channel]: [
          ...state.channels[action.channel],
          createMessage(action.id, state.chatInput),
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
};
export type {
  MomentType,
  ChangeChannelType,
};

export default reducer;
