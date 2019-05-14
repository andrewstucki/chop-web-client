// @flow
import { SET_PANE_CONTENT } from '../../dux';
import { HOST_INFO } from '../../../hostInfo/dux';
import { SCHEDULE } from '../../../schedule/dux';
import type { SetPaneType } from '../../dux';


const TAB = 'TAB';

// TODO: Move these constants when the features are actually created.
const BIBLE = 'BIBLE';
const NOTES = 'NOTES';

type TabType =
  | typeof HOST_INFO
  | typeof BIBLE
  | typeof SCHEDULE
  | typeof NOTES;

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
  BIBLE,
  NOTES,
};

export type {
  TabType,
  TabPaneType,
};
