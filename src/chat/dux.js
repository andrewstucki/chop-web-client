// @flow
import type { UserType, ChangeChannelType } from '../feed/dux';
import { CHANGE_CHANNEL } from '../feed/dux';

// Action Types
const CHAT_INPUT = 'CHAT_INPUT';
const TOGGLE_CHAT_FOCUS = 'TOGGLE_CHAT_FOCUS';
const ADD_TO_CURRENT_CHANNEL = 'ADD_TO_CURRENT_CHANNEL';

// Flow Type Definitions
type ChatInputAction = {
  type: 'CHAT_INPUT',
  value: string
};

type ToggleChatFocusAction = {
  type: 'TOGGLE_CHAT_FOCUS',
  focus: boolean
};

type AddToCurrentChannelAction = {
  type: 'ADD_TO_CURRENT_CHANNEL',
  id: string
};

type ChatActions =
  | ChatInputAction
  | ToggleChatFocusAction
  | AddToCurrentChannelAction
  | ChangeChannelType;

type PlaceholderType = {
  [string]: string,
};

type ChatState = {
  currentInput: string,
  focused: boolean,
  placeholders: PlaceholderType,
  currentChannel: string,
  currentPlaceholder: string,
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

const addToCurrentChannel = (): AddToCurrentChannelAction => (
  {
    type: ADD_TO_CURRENT_CHANNEL,
    id: createUid(),
  }
);

// Helper Functions
const createUid = () => {
  let seed = new Date().getTime(); // Used to insure more randomness
  const regEx = /[xy]/g;
  const replacer = char => {
    const randomNumber = (seed + Math.random() * 16) % 16 | 0;
    seed = Math.floor(seed / 16); // Update Seed
    return (char === 'x' ? randomNumber : (randomNumber & 0x3 | 0x8)).toString(16);
  };
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(regEx, replacer);
};

// Default State
const defaultState = {
  currentInput: '',
  focused: false,
  placeholders: {
    default: 'Chat',
    host: 'Chat with hosts',
  },
  currentChannel: 'default',
  currentPlaceholder: '',
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
  case ADD_TO_CURRENT_CHANNEL:
    return {
      ...state,
      currentInput: '',
    };
  case CHANGE_CHANNEL:
    return {
      ...state,
      currentChannel: action.channel,
    };
  default:
    return state;
  }
};

// Selectors

const textEntered = (state: ChatState) => 
  (state) ? state.currentInput.length > 0 : false;

const getPlaceholder = (state: ChatState) => (
  state.placeholders[state.currentChannel]
);

// Exports
export { 
  CHAT_INPUT,
  TOGGLE_CHAT_FOCUS,
  ADD_TO_CURRENT_CHANNEL,
};

export type { 
  ChatInputAction, 
  ToggleChatFocusAction, 
  AddToCurrentChannelAction,  
  ChatState,
};

export { 
  chatInput, 
  toggleChatFocus,
  addToCurrentChannel,
  textEntered,
  createUid,
  defaultState,
  getPlaceholder,
};

export default reducer;
