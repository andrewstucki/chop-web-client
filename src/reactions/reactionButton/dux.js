// @flow
import type { SharedSubscriberType } from '../../subscriber/dux';
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
  subscriber?: SharedSubscriberType,
};

const publishReaction = (currentSubscriber: SharedSubscriberType): PublishReactionActionType => (
  {
    type: PUBLISH_REACTION,
    reaction: createReaction(currentSubscriber),
  }
);

const createReaction = (currentSubscriber: SharedSubscriberType): ReactionType => (
  {
    type: REACTION,
    id: createUid(),
    subscriber: currentSubscriber,
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