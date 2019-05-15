// @flow
import type { TextModeType } from '../textModeToggle/dux';
import { createSelector } from 'reselect';
import { COMPACT } from '../textModeToggle/dux';
import type { UIDType } from '../cwc-types';
import type { ChopStateType } from '../chop/dux';

// Action Types
export const UPDATE_USER_SUCCEEDED = 'UPDATE_USER_SUCCEEDED';
export const UPDATE_USER_FAILED = 'UPDATE_USER_FAILED';
export const UPDATE_USER = 'UPDATE_USER';
export const SET_USER = 'SET_USER';
export const SET_HERE_NOW = 'SET_HERE_NOW';
export const ADD_HERE_NOW = 'ADD_HERE_NOW';
export const REMOVE_HERE_NOW = 'REMOVE_HERE_NOW';
export const UPDATE_HERE_NOW = 'UPDATE_HERE_NOW';
export const RECEIVE_MUTE_USER = 'RECEIVE_MUTE_USER';
export const PUBLISH_MUTE_USER = 'PUBLISH_MUTE_USER';
export const MUTE_USER_FAILED = 'MUTE_USER_FAILED';
export const MUTE_USER_SUCCEEDED = 'MUTE_USER_SUCCEEDED';
export const SET_AVATAR = 'SET_AVATAR';

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

type HereNowChannels = {
  [string]: Array<UserState>,
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

export type SetUser = {
  type: typeof SET_USER,
  user: PrivateUserType,
};

type UserState = {
  id: string,
  state: {
    available_prayer?: boolean,
  }
};

type SetAvatarType = {
  type: typeof SET_AVATAR,
  url: string,
};

type SetHereNow = {
  type: typeof SET_HERE_NOW,
  channel: string,
  users: Array<UserState>,
};

type AddHereNowType = {
  type: typeof ADD_HERE_NOW,
  channel: string,
  user: UserState,
};

type RemoveHereNowType = {
  type: typeof REMOVE_HERE_NOW,
  channel: string,
  userToken: string,
};

export type UserStateType = {|
  currentUser: PrivateUserType,
  hereNow: HereNowChannels,
  mutedUsers: Array<string>,
|};

type ReceiveMuteUserType = {
  type: 'RECEIVE_MUTE_USER',
  nickname: string,
};

type PublishMuteUserType = {
  type: 'PUBLISH_MUTE_USER',
  channelId: string,
  userName: string,
};

export type UserActionType =
  | SetUser
  | SetHereNow
  | UpdateUserSucceededType
  | RemoveHereNowType
  | AddHereNowType
  | SetAvatarType;

// action creators
export const setHereNow = (channel: string, users: Array<UserState>): SetHereNow => (
  {
    type: SET_HERE_NOW,
    channel,
    users,
  }
);

export const addHereNow = (channel: string, user: UserState): AddHereNowType => (
  {
    type: ADD_HERE_NOW,
    channel,
    user,
  }
);

export const removeHereNow = (channel: string, userToken: string): RemoveHereNowType => (
  {
    type: REMOVE_HERE_NOW,
    userToken,
    channel,
  }
);

export const setUser = (user: PrivateUserType): SetUser => (
  {
    type: SET_USER,
    user,
  }
);

export const setAvatar = (url: string): SetAvatarType => (
  {
    type: SET_AVATAR,
    url,
  }
);

export const receiveMuteUser = (nickname:string): ReceiveMuteUserType => (
  {
    type: RECEIVE_MUTE_USER,
    nickname,
  }
);

export const publishMuteUser = (channelId:string, userName:string): PublishMuteUserType => (
  {
    type: PUBLISH_MUTE_USER,
    channelId,
    userName,
  }
);

// default
export const defaultState = {
  hereNow: {},
  currentUser: {
    id: 0,
    name: '',
    pubnubToken: '',
    pubnubAccessKey: '',
    avatar: null,
    role: {
      label: '',
      permissions: [],
    },
    preferences: {
      textMode: COMPACT,
    },
  },
  mutedUsers: [],
};

// reducer
export default (
  state: UserStateType = defaultState,
  action?: UserActionType): UserStateType => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
    case SET_HERE_NOW:
      return {
        ...state,
        hereNow: {
          ...state.hereNow,
          [action.channel]: action.users,
        },
      };
    case ADD_HERE_NOW:
      return {
        ...state,
        hereNow: {
          ...state.hereNow,
          [action.channel]: [
            ...state.hereNow[action.channel] || [],
            action.user,
          ],
        },
      };
    case UPDATE_HERE_NOW: {
      const { user } = action;
      return {
        ...state,
        hereNow: {
          ...state.hereNow,
          [action.channel]: (state.hereNow[action.channel] || []).map(item => (
            item.id === user.id ? user : item
          )),
        },
      };
    }
    case REMOVE_HERE_NOW: {
      if (state.hereNow[action.channel]) {
        const { userToken } = action;
        return {
          ...state,
          hereNow: {
            ...state.hereNow,
            [action.channel]: state.hereNow[action.channel].filter(item => item.id !==  userToken),
          },
        };
      } else {
        return state;
      }
    }
    case SET_USER:
      return {
        ...state,
        currentUser: action.user,
      };
    case RECEIVE_MUTE_USER: {
    // $FlowFixMe
      const newArray = [...state.mutedUsers, action.nickname];
      return {
        ...state,
        // ensure no duplicates in the array
        mutedUsers: [...new Set(newArray)],
      };
    }
    case UPDATE_USER_SUCCEEDED: {
      const { user } = action;
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          preferences: {
            ...user.preferences,
          },
        },
      };
    }
    case SET_AVATAR: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          avatar: action.url,
        },
      };
    }
  }
  return state;
};
// Selectors
type StateType = ChopStateType | UserStateType;
const local = (state: StateType): UserStateType => state.currentUser ? state : state.user;

export const getCurrentUserAvatar = (state: StateType): ?string => local(state).currentUser.avatar;

export const getCurrentUser = (state: StateType): PrivateUserType => local(state).currentUser;

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

export const getCurrentUserAsSharedUser = createSelector<StateType, void, SharedUserType, PrivateUserType>(
  [getCurrentUser],
  privateUserToSharedUser
);

export const getTextMode = createSelector<StateType, void, SharedUserType, TextModeType>(
  [getCurrentUser],
  user => user.preferences.textMode
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


const getHereNow = (state: StateType): HereNowChannels => local(state).hereNow;

const getUsersInChannel = (state: StateType, channel:string): Array<UserState> => (
  getHereNow(state)[channel] || []
);

export const getUserCountInChannel = createSelector<StateType, string, number, Array<UserState>>(
  [getUsersInChannel],
  users => users.length
);

export const getMutedUsers = (state: StateType):Array<UIDType>  => local(state).mutedUsers;