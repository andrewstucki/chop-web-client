// @flow

// Action Types
export const REMOVE_AVATAR = 'REMOVE_AVATAR';

// Flow Type Definitions
export type RemoveAvatarType = {
  type: typeof REMOVE_AVATAR,
};

// Action Creators

export const removeAvatarType = (): RemoveAvatarType => (
  {
    type: REMOVE_AVATAR,
  }
);
