// @flow
import { createSelector } from 'reselect';
import type { ChopStateType } from '../chop/dux';
import type { FeedType } from '../feed/dux';

const local = (state: ChopStateType): FeedType => state.feed || state;

const currentEventExists = state => !!local(state)?.event?.id;
const currentEventEnabledFeatures = state => local(state)?.event?.enabledFeatures;

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
