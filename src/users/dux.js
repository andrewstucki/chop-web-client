// @flow
import type { TextModeType } from '../textModeToggle/dux';
import { createSelector } from 'reselect';
import type { FeedType } from '../feed/dux';

// Action Types

export const UPDATE_USER_SUCCEEDED = 'UPDATE_USER_SUCCEEDED';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const UPDATE_USER = 'UPDATE_USER';

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
  preferences: {
    textMode: TextModeType,
  }
};

export type UpdateUserType = {
  type: typeof UPDATE_USER,
  id: string,
  input: UserInputType,
};

export type UserInputType = 
 | UpdateUserPreferencesType;

export type UpdateUserPreferencesType = {
  preferences: {
    textMode: TextModeType,
  },
};

export type UpdateUserSucceededType = {
  type: typeof UPDATE_USER_SUCCEEDED,
  user: PrivateUserType,
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

export const updateTextMode = (mode: TextModeType): UpdateUserPreferencesType => (
  {
    preferences: {
      textMode: mode,
    },
  }
);

export const updateUser = (id: string, input: UserInputType): UpdateUserType => (
  {
    type: UPDATE_USER,
    id,
    input,
  }
);

export const updateUserSucceeded = (user: PrivateUserType): UpdateUserSucceededType => (
  {
    type: UPDATE_USER_SUCCEEDED,
    user,
  }
);
