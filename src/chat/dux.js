// @flow

// Action Types

const TOGGLE_CHAT_FOCUS = 'TOGGLE_CHAT_FOCUS';

// Flow Type Definitions

type ToggleChatFocusType = {
  type: 'TOGGLE_CHAT_FOCUS',
  focus: boolean
};

// Action Creators

const toggleChatFocus = (focus: boolean): ToggleChatFocusType => (
  {
    type: TOGGLE_CHAT_FOCUS,
    focus,
  }
);

// Exports

export {
  TOGGLE_CHAT_FOCUS,
};

export type {
  ToggleChatFocusType,
};

export {
  toggleChatFocus,
};
