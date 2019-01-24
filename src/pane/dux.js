//@flow
import type { EventType } from './content/event/dux';
import type { ChatType } from './content/chat/dux';

const SET_PANE_CONTENT = 'SET_PANE_CONTENT';
const PRIMARY_PANE = 'primary';

type PaneContentType =
  EventType |
  ChatType;

type PaneType = {
  type: string,
  content: PaneContentType,
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

export {
  SET_PANE_CONTENT,
  PRIMARY_PANE,
  setPrimaryPane,
};

export type {
  PaneContentType,
  PaneType,
};
