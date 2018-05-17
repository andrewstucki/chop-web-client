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
    [string]: {
      messages: Array<MessageType>,
      offset: number,
    }
  },
  currentChannel: string,
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
    default: {messages: [], offset: 0},
    host: {messages: [], offset: 0},
  },
  currentChannel: 'default',
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
    const { id } = action;
    const stateCopy = { ...state };
    const message = stateCopy.channels[state.currentChannel].messages
      .find(elem => elem.id === id);
    if (message) {
      message.neverRendered = false;
    }
    stateCopy.channels[state.currentChannel].offset = 
      stateCopy.channels[state.currentChannel].offset +
      action.offset;
    return stateCopy;
  }
  case ADD_TO_CURRENT_CHANNEL:
    return {
      ...state,
      channels: {
        ...state.channels,
        [state.currentChannel]: {
          ...state.channels[state.currentChannel],
          messages: [
            ...state.channels[state.currentChannel].messages,
            createMessage(action.id, state.chatInput),
          ],
        },
      },
    };
  case ADD_TO_CHANNEL:
    return {
      ...state,
      channels: {
        ...state.channels,
        [action.channel]: {
          ...state.channels[action.channel],
          messages: [
            ...state.channels[action.channel].messages,
            createMessage(action.id, state.chatInput),
          ],
        },
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
  default:
    return state;
  }
};

// Selectors

const feedContents = (state: FeedType): Array<MessageType> => (
  state.channels[state.currentChannel].messages
);

const getOffset = (state: FeedType): number => (
  state.channels[state.currentChannel].offset
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
  getOffset,
};
export type {
  MomentType,
  ChangeChannelType,
};

export default reducer;
