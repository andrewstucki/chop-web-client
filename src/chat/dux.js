// @flow

// Action Types

const TOGGLE_CHAT_FOCUS = 'TOGGLE_CHAT_FOCUS';
const SET_KEYBOARD_HEIGHT = 'SET_KEYBOARD_HEIGHT';

// Flow Type Definitions

type ToggleChatFocusType = {
  type: 'TOGGLE_CHAT_FOCUS',
  focus: boolean
};

type SetKeyboardHeightType = {
  type: 'SET_KEYBOARD_HEIGHT',
  height: number
};

// Action Creators

const toggleChatFocus = (focus: boolean): ToggleChatFocusType => (
  {
    type: TOGGLE_CHAT_FOCUS,
    focus,
  }
);

const setKeyboardHeight = (height: number): SetKeyboardHeightType => (
  {
    type: SET_KEYBOARD_HEIGHT,
    height,
  }
);

// Exports

export {
  TOGGLE_CHAT_FOCUS,
  SET_KEYBOARD_HEIGHT,
};

export type {
  ToggleChatFocusType,
};

export {
  toggleChatFocus,
  setKeyboardHeight,
};
