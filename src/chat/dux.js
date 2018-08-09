// @flow
import type { FeedType } from '../feed/dux';

// Action Types
const TOGGLE_CHAT_FOCUS = 'TOGGLE_CHAT_FOCUS';

// Flow Type Definitions

type ToggleChatFocusType = {
  type: 'TOGGLE_CHAT_FOCUS',
  focus: boolean
};

type ChatActions =
  | ToggleChatFocusType;


type ChatState = {
  focused: boolean,
};

// Action Creators

const toggleChatFocus = (focus: boolean): ToggleChatFocusType => (
  {
    type: TOGGLE_CHAT_FOCUS,
    focus,
  }
);

// Reducer
const reducer =
(
  state: Object = {},
  action?: ChatActions
): ChatState => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
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
  ToggleChatFocusType, 
  ChatState,
};

export { 
  toggleChatFocus,
  getPlaceholder,
};

export default reducer;
