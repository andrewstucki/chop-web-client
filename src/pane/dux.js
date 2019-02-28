//@flow
import type { EventPaneType } from './content/event/dux';
import type { ChatPaneType } from './content/chat/dux';
import type { TabPaneType } from './content/tab/dux';

import { EVENT } from './content/event/dux';
import { CHAT } from './content/chat/dux';
import { TAB } from './content/tab/dux';

const SET_PANE_CONTENT = 'SET_PANE_CONTENT';
const PRIMARY_PANE = 'primary';

type PaneType = EventPaneType | ChatPaneType | TabPaneType;

type SetPaneType = {
  type: typeof SET_PANE_CONTENT,
  name: string,
  pane: PaneType,
};

type PaneContentTypeType = typeof EVENT | typeof CHAT | typeof TAB;

const setPrimaryPane = (type: PaneContentTypeType, channelId: string):SetPaneType => (
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
  PRIMARY_PANE,
  SET_PANE_CONTENT,
  setPrimaryPane,
};

export type {
  PaneType,
  SetPaneType,
};
