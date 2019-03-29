// @flow
import type { SharedUserType } from '../../users/dux';
import { createUid } from '../../util';

const PUBLISH_REACTION = 'PUBLISH_REACTION';
const REACTION = 'REACTION';

type PublishReactionActionType = {
  type: 'PUBLISH_REACTION',
  reaction: ReactionType,
};

type ReactionType = {
  type: 'REACTION',
  id: string,
  user?: SharedUserType,
};

const publishReaction = (currentUser: SharedUserType): PublishReactionActionType => (
  {
    type: PUBLISH_REACTION,
    reaction: createReaction(currentUser),
  }
);

const createReaction = (currentUser: SharedUserType): ReactionType => (
  {
    type: REACTION,
    id: createUid(),
    user: currentUser,
  }
);

export {
  PUBLISH_REACTION,
  publishReaction,
};

export type {
  PublishReactionActionType,
  ReactionType,
};