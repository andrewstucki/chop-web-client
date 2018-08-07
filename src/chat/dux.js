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
  if (state.currentChannel === 'host') {
    return 'Chat with hosts';
  } else if (currentChannelObj &&
    currentChannelObj.participants &&
    currentChannelObj.participants.length
  ) {
    const isUserFirstParticipant =
      currentChannelObj.participants[0].id === state.currentUser.id;
    const firstParticipantName = currentChannelObj.participants[0].nickname;
    const secondParticipantName = currentChannelObj.participants[1].nickname;

    const otherUserName =
      isUserFirstParticipant ? secondParticipantName : firstParticipantName;
    return `Chat with ${otherUserName}`;
  } else {
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
