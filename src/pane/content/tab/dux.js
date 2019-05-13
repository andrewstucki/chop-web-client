// @flow
import { SET_PANE_CONTENT } from '../../dux';
import { HOST_INFO } from '../../../hostInfo/dux';
import type { SetPaneType } from '../../dux';

const TAB = 'TAB';

type TabType = typeof HOST_INFO;

type TabPaneType = {
  type: typeof TAB,
  content: {
    type: TabType,
  },
};

const setPaneToTab = (name: string, type: TabType):SetPaneType => (
  {
    type: SET_PANE_CONTENT,
    name,
    pane: {
      type: TAB,
      content: {
        type,
      },
    },
  }
);

export {
  setPaneToTab,
  SET_PANE_CONTENT,
  TAB,
};

export type {
  TabType,
  TabPaneType,
};
