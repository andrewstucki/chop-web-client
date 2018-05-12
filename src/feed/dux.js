// @flow
import type { MessageType, AddToCurrentChannelAction} from '../chat/dux';
import { ADD_TO_CURRENT_CHANNEL} from '../chat/dux';

// Action Types
const CHANGE_CHANNEL = 'CHANGE_CHANNEL';
const ADD_TO_CHANNEL = 'ADD_TO_CHANNEL';
const ADD_CHANNEL = 'ADD_CHANNEL';
const REMOVE_CHANNEL = 'REMOVE_CHANNEL';

// Flow Type Definitions
type MomentType =
  | MessageType

type FeedType = {
  channels: {
    [string]: Array<MomentType>
  },
  currentChannel: string
}

type ChangeChannelType = {
  type: 'CHANGE_CHANNEL',
  channel: string
}

type AddToChannelType = {
  type: 'ADD_TO_CHANNEL',
  message: MessageType,
  channel: string,
}

type AddChannelType = {
  type: 'ADD_CHANNEL',
  channel: string,
}

type RemoveChannelType = {
  type: 'REMOVE_CHANNEL',
  channel: string,
}

type FeedActionTypes =
  | ChangeChannelType
  | AddToCurrentChannelAction
  | AddToChannelType
  | AddChannelType
  | RemoveChannelType

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
  },
  currentChannel: 'default',
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
          action.message,
          ...state.channels[state.currentChannel],
        ],
      },
    };
  case ADD_TO_CHANNEL:
    return {
      ...state,
      channels: {
        ...state.channels,
        [action.channel]: [
          action.message,
          ...state.channels[action.channel],
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
};
export {
  changeChannel,
  addToChannel,
  addChannel,
  removeChannel,
  feedContents,
};
export type {
  MomentType,
};

export default reducer;
