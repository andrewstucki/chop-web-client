// @flow
import type { FeedType } from '../feed/dux';

// Action Types
const TOGGLE_CHAT_FOCUS = 'TOGGLE_CHAT_FOCUS';

// Flow Type Definitions

type ToggleChatFocusAction = {
  type: 'TOGGLE_CHAT_FOCUS',
  focus: boolean
};

type ChatActions =
  | ToggleChatFocusAction;


type ChatState = {
  focused: boolean,
};

// Action Creators

const toggleChatFocus = (focus: boolean): ToggleChatFocusAction => (
  {
    type: TOGGLE_CHAT_FOCUS,
    focus,
  }
);

// Default State
const defaultState = {
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
  case TOGGLE_CHAT_FOCUS:
    return {
      ...state,
      focused: action.focus,
    };
  default:
    return state;
  }
};

// Selectors

const getPlaceholder = (state: FeedType) => {
  const currentChannelObj = state.channels[state.currentChannel];
  let otherUserName = [];
  if (state.currentChannel === 'host') {
    return 'Chat with hosts';
  } else if (currentChannelObj &&
    currentChannelObj.participants &&
    currentChannelObj.participants.length === 2
  ) {
    const [ getOtherUser ] = currentChannelObj.participants.filter(paricipant =>
      paricipant.id !== state.currentUser.id
    );
    otherUserName.push(getOtherUser.nickname);
    return `Chat with ${otherUserName[0]}`;
  } else {
    otherUserName = [];
    return 'Chat';
  }
};

// Exports
export { 
  TOGGLE_CHAT_FOCUS,
};

export type { 
  ToggleChatFocusAction, 
  ChatState,
};

export { 
  toggleChatFocus,
  defaultState,
  getPlaceholder,
};

export default reducer;
