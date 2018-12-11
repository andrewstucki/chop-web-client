import { createSelector } from 'reselect';

const currentEventExists = state => (
  !!state.event.id
);

const getSchedule = state => state.schedule;

const isOffline = createSelector(
  currentEventExists,
  result => !result
);

const getNextEventData = createSelector(
  getSchedule,
  schedule => schedule[0]
);

export {
  isOffline,
  getNextEventData,
};
