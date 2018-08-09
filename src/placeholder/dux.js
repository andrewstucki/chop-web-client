// @flow
import type { AnchorMomentType } from './anchorMoment/dux';
import type { FeedType } from '../feed/dux';

// Selectors

const placeholderContents = (
  state: FeedType
): AnchorMomentType | null => (
  state.anchorMoment
);

const getCurrentChannel = (state: FeedType): string => (
  state.currentChannel
);

const toggleAnchorMomentAnchored = (state: FeedType): boolean => (
  state.anchorMoment === null ? false : true
);

// Exports

export {
  placeholderContents,
  getCurrentChannel,
  toggleAnchorMomentAnchored,
};
