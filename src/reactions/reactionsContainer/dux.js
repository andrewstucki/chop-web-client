// @flow
import type { FeedType } from '../../feed/dux';

// Selectors

const getReactions = (state: FeedType): Array<ReactionType> => (
  state.reactions
);

// Exports

export {
  getReactions,
};