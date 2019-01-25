//@flow
import { createSelector } from 'reselect';
import type { FeedType } from '../feed/dux';

const getPane = (state:FeedType, name:string) => state.panes[name];

const paneContentSelector = createSelector(
  getPane,
  pane => pane.active,
);

const previousPaneContentSelector = createSelector(
  getPane,
  pane => pane.previous,
);

export {
  getPane,
  paneContentSelector,
  previousPaneContentSelector,
};
