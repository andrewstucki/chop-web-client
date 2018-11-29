import { createSelector } from 'reselect';

const currentEventExists = state => (
  state.event.id !== 0 && state.event.title !== ''
);

const isOffline = createSelector(
  currentEventExists,
  result => !result
);

export {
  isOffline,
};