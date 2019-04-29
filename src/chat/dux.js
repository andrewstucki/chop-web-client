// @flow

// Action Types

const SET_CHAT_FOCUS = 'SET_CHAT_FOCUS';

// Flow Type Definitions

type SetChatFocusType = {
  type: 'SET_CHAT_FOCUS',
  channel: string,
};

// Action Creators

const setChatFocus = (channel: string): SetChatFocusType => (
  {
    type: SET_CHAT_FOCUS,
    channel,
  }
);

// Exports

export {
  SET_CHAT_FOCUS,
};

export type {
  SetChatFocusType,
};

export {
  setChatFocus,
};
