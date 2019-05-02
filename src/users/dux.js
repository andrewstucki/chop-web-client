// @flow
import { createSelector } from 'reselect';
import type { FeedType } from '../feed/dux';

// Flow types
export type SharedUserType = {
  id: number,
  name: string,
  avatar: ?string,
  pubnubToken: string,
  role: {
    label: string,
  },
};

export type PrivateUserType = {
  id: number,
  name: string,
  avatar: ?string,
  pubnubToken: string,
  pubnubAccessKey: string,
  role: {
    label: string,
    permissions: Array<string>,
  },
};



// Selectors
export const getCurrentUser = (state: FeedType): PrivateUserType => state.currentUser;

export const checkForPermissions = (user: PrivateUserType, requiredPermissions: Array<string>, requireAll: boolean): boolean => {
  if (requireAll) {
    return requiredPermissions.every(
      permission => user.role.permissions.includes(permission)
    );
  } else {
    return user.role.permissions.some(
      permission => requiredPermissions.includes(permission)
    );
  }
};

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

export const hasPermissions = createSelector(
  getCurrentUser,
  (_state, requiredPermissions, _requireAll) => requiredPermissions,
  (_state, _requiredPermissions, requireAll) => requireAll,
  checkForPermissions
);

export const getCurrentUserAsSharedUser = createSelector<FeedType, void, SharedUserType, PrivateUserType>(
  [getCurrentUser],
  privateUserToSharedUser
);
