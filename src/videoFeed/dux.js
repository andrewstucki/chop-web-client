// @flow
import type { ToggleChatFocusAction } from '../chat/dux';
import { TOGGLE_CHAT_FOCUS } from '../chat/dux';

// Type Definitions

type VideoFeedType = {
  isVideoHidden: boolean,
};

type VideoFeedActionTypes =
  | ToggleChatFocusAction;

// Default State

const defaultState = {
  isVideoHidden: false,
};

// Reducer

const reducer = (
  state: VideoFeedType = defaultState,
  action?: VideoFeedActionTypes): VideoFeedType => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
  case TOGGLE_CHAT_FOCUS:
    return {
      isVideoHidden: action.focus,
    };
  default:
    return state;
  }
};

// Selectors

const getChatFocus = (state: VideoFeedType): boolean => (
  state.isVideoHidden
);

// Exports

export {
  getChatFocus,
};

export default reducer;
