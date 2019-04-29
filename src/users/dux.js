// @flow
import { createSelector } from 'reselect';
import type {FeedType} from '../feed/dux';

// Flow Types

type BaseUserType = {
  id: number,
  name: string,
  avatar: ?string,
  pubnubToken: string,
}

type BaseUserRoleType = {
  label: string,
};

export type SharedUserType =
  BaseUserType & {
  role: BaseUserRoleType,
};

type PrivateUserRoleType =
  BaseUserRoleType & {
  permissions: Array<string>,
};

export type PrivateUserType =
  BaseUserType &
  {
  pubnubAccessKey: string,
  role: PrivateUserRoleType,
};


// Selectors
export const getCurrentUser = (state: FeedType): PrivateUserType => state.currentUser;

export const privateUserToSharedUser = (user: PrivateUserType): SharedUserType => {
  const { id, name, avatar, pubnubToken, role: { label }} = user;
  return {
    id,
    name,
    avatar,
    pubnubToken,
    role: {
      label,
    },
  };
};

export const getCurrentUserAsSharedUser = createSelector<FeedType, void, SharedUserType, PrivateUserType>(
  [getCurrentUser],
  privateUserToSharedUser
);
