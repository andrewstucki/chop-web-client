// @flow
import type { ChopStateType } from '../../chop/dux';
import type { ReactionType } from '../reactionButton/dux';

// Selectors
const local = state => state.feed || state;

const getReactions = (state: ChopStateType): Array<ReactionType> => (
  local(state).reactions
);

// Exports

export {
  getReactions,
};