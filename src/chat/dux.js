// @flow

// Action Types

const SET_CHAT_FOCUS = 'SET_CHAT_FOCUS';
const SET_KEYBOARD_HEIGHT = 'SET_KEYBOARD_HEIGHT';

// Flow Type Definitions

type SetChatFocusType = {
  type: 'SET_CHAT_FOCUS',
  channel: string,
};

type SetKeyboardHeightType = {
  type: 'SET_KEYBOARD_HEIGHT',
  height: number
};

// Action Creators

const setChatFocus = (channel: string): SetChatFocusType => (
  {
    type: SET_CHAT_FOCUS,
    channel,
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
  SET_CHAT_FOCUS,
  SET_KEYBOARD_HEIGHT,
};

export type {
  SetChatFocusType,
  SetKeyboardHeightType,
};

export {
  setChatFocus,
  setKeyboardHeight,
};
