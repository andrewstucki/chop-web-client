// @flow
import type {
  PublishMessageAction,
  ChatInputAction,
} from '../chat/dux';

import type {
  MessageType,
  OpenMessageTrayType,
  CloseMessageTrayType,
  DeleteMessageType,
} from '../moment';

import type { SetUser } from '../io/chat/dux';

import {
  PUBLISH_MESSAGE,
  CHAT_INPUT,
} from '../chat/dux';

import {
  createMessage,
  OPEN_MESSAGE_TRAY,
  CLOSE_MESSAGE_TRAY,
  DELETE_MESSAGE,
} from '../moment';

import { SET_USER } from '../io/chat/dux';

// Action Types
const CHANGE_CHANNEL = 'CHANGE_CHANNEL';
const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';//RECEIVE
const ADD_CHANNEL = 'ADD_CHANNEL';
const REMOVE_CHANNEL = 'REMOVE_CHANNEL';

// Flow Type Definitions
type MomentType =
  | MessageType;

type UserType = {
  id: string,
  nickname: string,
};

type MessageTypeList = Array<MessageType>;

type FeedType = {
  channels: {
    [string]: MessageTypeList,
  },
  currentChannel: string,
  chatInput: string,
  currentUser: UserType,
  appendingMessage: boolean,
};

type ChannelType = {
  id: string,
  name: string,
}

type ChangeChannelType = {
  type: 'CHANGE_CHANNEL',
  channel: string,
};

type ReceiveMessageType = {
  type: 'RECEIVE_MESSAGE',
  channel: string,
  message: MessageType,
};

type AddChannelType = {
  type: 'ADD_CHANNEL',
  channel: ChannelType,
};

type RemoveChannelType = {
  type: 'REMOVE_CHANNEL',
  channel: string,
};

type FeedActionTypes =
  | ChangeChannelType
  | PublishMessageAction
  | ReceiveMessageType
  | AddChannelType
  | RemoveChannelType
  | ChatInputAction
  | SetUser
  | OpenMessageTrayType
  | CloseMessageTrayType
  | DeleteMessageType;

// Action Creators

const changeChannel = (newChannel: string): ChangeChannelType => (
  {
    type: CHANGE_CHANNEL,
    channel: newChannel,
  }
);

const receiveMessage = (channel: string, message: MessageType): ReceiveMessageType => (
  {
    type: RECEIVE_MESSAGE,
    channel,
    message,
  }
);

const addChannel = (name: string, id: string): AddChannelType => (
  {
    type: ADD_CHANNEL,
    channel: {
      name,
      id,
    },
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
  },
  currentChannel: '',
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
  case PUBLISH_MESSAGE:
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
  case RECEIVE_MESSAGE:
    return {
      ...state,
      appendingMessage: false,
      channels: {
        ...state.channels,
        [action.channel]: [
          ...state.channels[action.channel],
          action.message,
        ],
      },
    };
  case ADD_CHANNEL:
    if (state.channels[action.channel.name]) {
      return state;
    }
    return {
      ...state,
      channels: {
        ...state.channels,
        [action.channel.name]: [],
      },
    };
  case REMOVE_CHANNEL: {
    const stateCopy = {...state};
    if (action.channel === state.currentChannel) {
      stateCopy.currentChannel = 'public';
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
  case OPEN_MESSAGE_TRAY: {
    const { id } = action;
    return {
      ...state,
      channels: {
        ...state.channels,
        [state.currentChannel]: state.channels[state.currentChannel].map(
          message => (
            {
              ...message,
              messageTrayOpen: message.id === id,
            }
          )
        ),
      },
    };
  }
  case CLOSE_MESSAGE_TRAY: {
    const { id } = action;
    return {
      ...state,
      channels: {
        ...state.channels,
        [state.currentChannel]: state.channels[state.currentChannel].map(
          message => (
            {
              ...message,
              messageTrayOpen: message.id === id ? false : null,
            }
          )
        ),
      },
    };
  }
  case DELETE_MESSAGE: {
    const { id } = action;
    const { channels, currentChannel } = state;
    const messageIndex = channels[currentChannel].findIndex(el => (
      el.id === id
    ));
    return {
      ...state,
      channels: {
        ...channels,
        [currentChannel]: [
          ...channels[currentChannel].slice(0, messageIndex),
          ...channels[currentChannel].slice(messageIndex + 1),
        ],
      },
    };
  }
  default:
    return state;
  }
};

// Selectors

const feedContents = (state: FeedType): Array<MessageType> => (
  state.channels[state.currentChannel] || []
);

const appendMessage = (state: FeedType) => (
  state.appendingMessage
);

// Exports

export {
  CHANGE_CHANNEL,
  RECEIVE_MESSAGE,
  ADD_CHANNEL,
  REMOVE_CHANNEL,
};
export {
  changeChannel,
  receiveMessage,
  addChannel,
  removeChannel,
  feedContents,
  defaultState,
  appendMessage,
};
export type {
  AddChannelType,
  MomentType,
  ReceiveMessageType,
  ChangeChannelType,
  UserType,
  FeedType,
};

export default reducer;
