//@flow
import type { EventType } from './content/event/dux';
import type { ChatType } from './content/chat/dux';

const SET_PANE_CONTENT = 'SET_PANE_CONTENT';
const UPDATE_PANE_ANIMATION = 'UPDATE_PANE_ANIMATION';
const PRIMARY_PANE = 'primary';

type PaneContentType =
  EventType |
  ChatType;

type PaneType = {
  type: string,
  content: PaneContentType,
};

type SetPrimaryPaneType = {
  type: typeof SET_PANE_CONTENT,
  name: string,
  pane: PaneType,
};

type UpdatePaneAnimationType = {
  type: typeof UPDATE_PANE_ANIMATION,
  name: string,
  isAnimating: boolean,
};

const setPrimaryPane = (channelId: string, type: 'EVENT' | 'CHAT') => (
  {
    type: SET_PANE_CONTENT,
    name: PRIMARY_PANE,
    pane: {
      type,
      content: {
        channelId,
      },
    },
  }
);

const updatePaneAnimation = (name: string, isAnimating: boolean) => (
  {
    type: UPDATE_PANE_ANIMATION,
    name,
    isAnimating,
  }
);

export {
  PRIMARY_PANE,
  SET_PANE_CONTENT,
  UPDATE_PANE_ANIMATION,
  setPrimaryPane,
  updatePaneAnimation,
};

export type {
  PaneContentType,
  PaneType,
  SetPrimaryPaneType,
  UpdatePaneAnimationType,
};
