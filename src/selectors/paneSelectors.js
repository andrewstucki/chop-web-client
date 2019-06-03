//@flow
import { createSelector } from 'reselect';
import type {PaneType} from '../pane/dux';
import type { ChopStateType } from '../chop/dux';

const ID = 'feed';

const local = state => state[ID] || state;

const getPane = (state:ChopStateType, name:string) => local(state).panes[name];

const paneContentSelector = createSelector<ChopStateType, string, PaneType, PaneType>(
  getPane,
  pane => pane,
);

export {
  getPane,
  paneContentSelector,
};
