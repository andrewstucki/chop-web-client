//@flow
import { createSelector } from 'reselect';
import type { FeedType } from '../feed/dux';
import type {PaneType} from '../pane/dux';

const getPane = (state:FeedType, name:string) => state.panes[name];

const paneContentSelector = createSelector<FeedType, string, PaneType, PaneType>(
  getPane,
  pane => pane,
);

export {
  getPane,
  paneContentSelector,
};
