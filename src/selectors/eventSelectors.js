import { createSelector } from 'reselect';

const currentEventExists = state => !!state?.event?.id;

const isOffline = createSelector(
  currentEventExists,
  result => result === false
);

export {
  isOffline,
};
