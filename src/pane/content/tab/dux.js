// @flow
import { SET_PANE_CONTENT } from '../../dux';
import { HOST_INFO } from '../../../hostInfo/dux';
import type { SetPaneType } from '../../dux';

const TAB = 'TAB';
const ADD_TAB = 'ADD_TAB';
const REMOVE_TAB = 'REMOVE_TAB';

type TabTypeType = typeof HOST_INFO;

type TabType = {
  id: string,
  name: string,
  type: TabTypeType,
};

type TabPaneType = {
  type: typeof TAB,
  content: {
    type: TabTypeType,
  },
};

type AddTabType = {
  type: typeof ADD_TAB,
  tab: TabType,
};

type RemoveTabType = {
  type: typeof REMOVE_TAB,
  tabType: TabTypeType,
};

const setPaneToTab = (name: string, type: TabTypeType):SetPaneType => (
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

const addTab = (type: TabTypeType, id: string,  name: string):AddTabType => (
  {
    type: ADD_TAB,
    tab: {
      type,
      id,
      name,
    },
  }
);

const removeTab = (tabType: TabTypeType):RemoveTabType => (
  {
    type: REMOVE_TAB,
    tabType,
  }
);

export {
  setPaneToTab,
  SET_PANE_CONTENT,
  TAB,
  ADD_TAB,
  REMOVE_TAB,
  addTab,
  removeTab,
};

export type {
  TabType,
  TabTypeType,
  AddTabType,
  RemoveTabType,
  TabPaneType,
};
