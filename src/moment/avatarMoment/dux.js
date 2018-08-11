// @flow
import type { SharedUserType } from '../../feed/dux';
import { createUid } from '../../util';
import { PUBLISH_MOMENT_TO_CHANNEL } from '../dux';

// Action Types

const AVATAR_MOMENT = 'AVATAR_MOMENT';

// Flow Type Definitions

type AvatarMomentType = {
  type: 'AVATAR_MOMENT',
  id: string,
  user: SharedUserType,
};

type PublishAvatarMomentType = {
  type: 'PUBLISH_AVATAR_MOMENT',
  channel: string,
  user: SharedUserType,
};

type AvatarMomentActionTypes =
  | PublishAvatarMomentType;

// Action Creators

const publishAvatarMoment = (user: SharedUserType, channel: string) => (
  {
    type: PUBLISH_MOMENT_TO_CHANNEL,
    channel,
    moment: {
      type: AVATAR_MOMENT,
      id: createUid(),
      user,
    },
  }
);

// Exports

export {
  AVATAR_MOMENT,
};

export {
  publishAvatarMoment,
};

export type {
  AvatarMomentType,
  AvatarMomentActionTypes,
  PublishAvatarMomentType,
};
