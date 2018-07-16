// @flow
import type { FeedType } from '../feed/dux';
import { createUid } from '../util';

// Action Types
const CHAT_INPUT = 'CHAT_INPUT';
const TOGGLE_CHAT_FOCUS = 'TOGGLE_CHAT_FOCUS';
const PUBLISH_MESSAGE = 'PUBLISH_MESSAGE';

// Flow Type Definitions
type ChatInputAction = {
  type: 'CHAT_INPUT',
  value: string
};

type ToggleChatFocusAction = {
  type: 'TOGGLE_CHAT_FOCUS',
  focus: boolean
};

type PublishMessageAction = {
  type: 'PUBLISH_MESSAGE',
  id: string
};

type ChatActions =
  | ChatInputAction
  | ToggleChatFocusAction
  | PublishMessageAction;


type ChatState = {
  currentInput: string,
  focused: boolean,
};


// Action Creators

const chatInput = (value: string): ChatInputAction => (
  {
    type: CHAT_INPUT,
    value,
  }
);

const toggleChatFocus = (focus: boolean): ToggleChatFocusAction => (
  {
    type: TOGGLE_CHAT_FOCUS,
    focus,
  }
);

const addToCurrentChannel = (): PublishMessageAction => (
  {
    type: PUBLISH_MESSAGE,
    id: createUid(),
  }
);

// Default State
const defaultState = {
  currentInput: '',
  focused: false,
};

// Reducer
const reducer =
(
  state: ChatState = defaultState,
  action?: ChatActions
): ChatState => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
  case CHAT_INPUT:
    return {
      ...state,
      currentInput: action.value,
    };
  case TOGGLE_CHAT_FOCUS:
    return {
      ...state,
      focused: action.focus,
    };
  case PUBLISH_MESSAGE:
    return {
      ...state,
      currentInput: '',
    };
  default:
    return state;
  }
};

// Selectors

const textEntered = (state: ChatState) => 
  (state) ? state.currentInput.length > 0 : false;

const getPlaceholder = (state: FeedType) => {
  if (state.currentChannel === 'host') {
    return 'Chat with hosts';
  } else if (state.channels[state.currentChannel] &&
      state.channels[state.currentChannel].participants &&
      state.channels[state.currentChannel].participants.length) {
    return `Chat with ${state.channels[state.currentChannel].participants[0].nickname}`;
  } else {
    return 'Chat';
  }
};

// Exports
export { 
  CHAT_INPUT,
  TOGGLE_CHAT_FOCUS,
  PUBLISH_MESSAGE,
};

export type { 
  ChatInputAction, 
  ToggleChatFocusAction, 
  PublishMessageAction,  
  ChatState,
};

export { 
  chatInput, 
  toggleChatFocus,
  addToCurrentChannel,
  textEntered,
  defaultState,
  getPlaceholder,
};

export default reducer;
