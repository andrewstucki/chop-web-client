// @flow
import type { ToggleChatFocusAction } from '../chat/dux';
import { TOGGLE_CHAT_FOCUS } from '../chat/dux';

const SET_VIDEO_URL = 'SET_VIDEO_URL';

// Type Definitions

type VideoFeedType = {
  isVideoHidden: boolean,
  url: string,
};

type SetVideoUrl = {
  type: 'SET_VIDEO_URL',
  url: string,
}

type VideoFeedActionTypes =
  | ToggleChatFocusAction
  | SetVideoUrl;

// Default State

const defaultState = {
  isVideoHidden: false,
  url: '',
};

// Action Creators
const setVideoUrl = (url: string): SetVideoUrl => (
  {
    type: SET_VIDEO_URL,
    url,
  }
)

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
      ...state,
      isVideoHidden: action.focus,
    };
  case SET_VIDEO_URL:
    return {
      ...state,
      url: action.url,
    }
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
  defaultState,
  setVideoUrl,
};

export default reducer;
