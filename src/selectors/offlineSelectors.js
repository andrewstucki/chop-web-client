//@flow
import { createSelector } from 'reselect';

const getSchedule = state => state.feed.schedule;

const getNextEventData = createSelector(
  getSchedule,
  schedule => schedule[0]
);

export {
  getNextEventData,
};
