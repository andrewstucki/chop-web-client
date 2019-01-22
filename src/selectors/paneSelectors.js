//@flow
import { createSelector } from 'reselect';

const getPane = (state, name) => state.panes[name];

const paneContentSelector = createSelector(
  getPane,
  pane => pane.active,
);

const previousPaneContentSelector = createSelector(
  getPane,
  pane => pane.previous,
);

export {
  paneContentSelector,
  previousPaneContentSelector,
};
