//@flow
import { createSelector } from 'reselect';

const getPane = (state, name) => state.panes[name];

const paneContentSelector = createSelector(
  getPane,
  pane => pane
);

export {
  paneContentSelector,
};
