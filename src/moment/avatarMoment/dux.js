// @flow
import type { UserType } from '../../feed/dux';
import { createUid } from '../../chat/dux';

// Type Definitions

const AVATAR_MOMENT = 'AVATAR_MOMENT';
const PUBLISH_AVATAR_MOMENT = 'PUBLISH_AVATAR_MOMENT';

type AvatarMomentType = {
  type: 'AVATAR_MOMENT',
  id: string,
  user: UserType,
};

type PublishAvatarMomentType = {
  type: 'PUBLISH_AVATAR_MOMENT',
  channel: string,
  user: UserType,
};

type AvatarMomentActionTypes =
  | PublishAvatarMomentType;

// Action Creators

const publishAvatarMoment = (user: UserType, channel: string) => (
  {
    type: PUBLISH_AVATAR_MOMENT,
    channel,
    avatarMoment: {
      type: AVATAR_MOMENT,
      id: createUid(),
      user,
    },
  }
);

export {
  AVATAR_MOMENT,
  PUBLISH_AVATAR_MOMENT,
};

export {
  publishAvatarMoment,
};

export type {
  AvatarMomentType,
  AvatarMomentActionTypes,
  PublishAvatarMomentType,
};
