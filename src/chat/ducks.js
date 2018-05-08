// @flow

// Action Types
const CHAT_INPUT = 'CHAT_INPUT';
const TOGGLE_CHAT_FOCUS = 'TOGGLE_CHAT_FOCUS';
const ADD_TO_CURRENT_CHANNEL = 'ADD_TO_CURRENT_CHANNEL';

// Flow Type Definitions
type ChatInputAction = {
  type: 'CHAT_INPUT',
  value: string
}

type ToggleChatFocusAction = {
  type: 'TOGGLE_CHAT_FOCUS',
  focus: boolean
}

type AddToCurrentChannelAction = {
  type: 'ADD_TO_CURRENT_CHANNEL',
  message: MessageType
}

type MessageType = {
  id: string,
  message: string
}

type ChatState = {
  currentInput: string
}


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

const addToCurrentChannel = (message: MessageType): AddToCurrentChannelAction => (
  {
    type: ADD_TO_CURRENT_CHANNEL,
    message,
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

const createMessage = (message: string): MessageType => (
  {
    id: createUid(),
    message,
  }
);

// Default State
const defaultState = {
  currentInput: '',
};

// Reducer
const reducer =
(
  state: ChatState = defaultState,
  action?: ChatInputAction
): ChatState =>
{
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
  case CHAT_INPUT:
    return {
      ...state,
      currentInput: action.value.substring(0, 100),
    };
  default:
    return state;
  }
};

// Selectors


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
  MessageType, 
  ChatState,
};
export { 
  chatInput, 
  toggleChatFocus,
  addToCurrentChannel,
  createMessage,
};
export default reducer;
