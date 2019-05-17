// @flow
import type { FeedType } from '../../feed/dux';
import type { ReactionType } from '../reactionButton/dux';

// Selectors

const getReactions = (state: FeedType): Array<ReactionType> => (
  state.reactions
);

// Exports

export {
  getReactions,
};