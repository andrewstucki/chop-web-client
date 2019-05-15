import { createSelector } from 'reselect';

const ID = 'feed';

const local = state => state[ID] || state;

const currentEventExists = state => !!local(state).event?.id;

const isOffline = createSelector(
  currentEventExists,
  result => result === false
);

export {
  isOffline,
};
