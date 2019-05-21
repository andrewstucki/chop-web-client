import { createSelector } from 'reselect';

const currentEventExists = state => !!state?.event?.id;
const currentEventEnabledFeatures = state => state?.event?.enabledFeatures;

const isOffline = createSelector(
  currentEventExists,
  result => result === false
);

const isChatEnabled = createSelector(
  currentEventEnabledFeatures,
  result => result && result.chat === true
);

export {
  isOffline,
  isChatEnabled,
};
