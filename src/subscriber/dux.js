// @flow
import type { TextModeType } from '../textModeToggle/dux';
import { createSelector } from 'reselect';
import { COMPACT } from '../textModeToggle/dux';
import type { UIDType } from '../cwc-types';
import type { ChopStateType } from '../chop/dux';

// Action Types
export const UPDATE_SUBSCRIBER = 'UPDATE_SUBSCRIBER';
export const UPDATE_SUBSCRIBER_SUCCESS = 'UPDATE_SUBSCRIBER_SUCCESS';
export const UPDATE_GUEST_NICKNAME = 'UPDATE_GUEST_NICKNAME';
export const SET_SUBSCRIBER = 'SET_SUBSCRIBER';
export const SET_HERE_NOW = 'SET_HERE_NOW';
export const ADD_HERE_NOW = 'ADD_HERE_NOW';
export const REMOVE_HERE_NOW = 'REMOVE_HERE_NOW';
export const UPDATE_HERE_NOW = 'UPDATE_HERE_NOW';
export const RECEIVE_MUTE_SUBSCRIBER = 'RECEIVE_MUTE_SUBSCRIBER';
export const PUBLISH_MUTE_SUBSCRIBER = 'PUBLISH_MUTE_SUBSCRIBER';
export const MUTE_SUBSCRIBER_FAILED = 'MUTE_SUBSCRIBER_FAILED';
export const MUTE_SUBSCRIBER_SUCCEEDED = 'MUTE_SUBSCRIBER_SUCCEEDED';
export const SET_AVATAR = 'SET_AVATAR';
export const CLEAR_SUBSCRIBER = 'CLEAR_SUBSCRIBER';
export const PUBLISH_REQUEST_PASSWORD_RESET = 'PUBLISH_REQUEST_PASSWORD_RESET';
export const PUBLISH_RESET_PASSWORD = 'PUBLISH_RESET_PASSWORD';
export const UPLOAD_AVATAR = 'UPLOAD_AVATAR';
export const DELETE_SELF = 'DELETE_SELF';

// Flow types
export type SharedSubscriberType = {|
  userId?: number,  // Only needed to pass to legacy when creating a message
  id: string,
  nickname: string,
  avatar: ?string,
  role: {
    label: string,
  },
|};

export type PrivateSubscriberType = {|
  userId?: number,  // Only needed to pass to legacy when creating a message
  id: string,
  nickname: string,
  avatar: ?string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  pubnubAccessKey: string,
  role: {
    label: string,
    permissions: Array<string>,
  },
  preferences: {
    textMode?: TextModeType,
  }
|};

type HereNowChannels = {
  [string]: Array<SubscriberState>,
};

export type UpdateSubscriberType = {
  type: typeof UPDATE_SUBSCRIBER,
  id: string,
  input: SubscriberInputType,
};

type UpdateSubscriberSuccessType = {|
  type: typeof UPDATE_SUBSCRIBER_SUCCESS,
  input: SubscriberInputType,
|};

export type UpdateGuestNicknameType = {|
  type: typeof UPDATE_GUEST_NICKNAME,
  id: string,
  nickname: string,
|};

export type SubscriberPreferencesInputType = {|
  textMode?: TextModeType,
|};

export type SubscriberInputType = {|
  nickname?: string,
  avatar?: string,
  firstName?: string,
  lastName?: string,
  email?: string,
  phoneNumber?: string,
  preferences?: SubscriberPreferencesInputType,
|};

export type SetSubscriber = {
  type: typeof SET_SUBSCRIBER,
  subscriber: PrivateSubscriberType,
};

type SubscriberState = {
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
  subscribers: Array<SubscriberState>,
};

type AddHereNowType = {
  type: typeof ADD_HERE_NOW,
  channel: string,
  subscriber: SubscriberState,
};

type RemoveHereNowType = {
  type: typeof REMOVE_HERE_NOW,
  channel: string,
  subscriberToken: string,
};

export type SubscriberStateType = {|
  currentSubscriber: PrivateSubscriberType,
  hereNow: HereNowChannels,
  mutedSubscribers: Array<string>,
|};

type ReceiveMuteSubscriberType = {
  type: typeof RECEIVE_MUTE_SUBSCRIBER,
  nickname: string,
};

type PublishMuteSubscriberType = {
  type: typeof PUBLISH_MUTE_SUBSCRIBER,
  channelId: string,
  subscriberName: string,
};

export type UploadAvatarType = {
  type: typeof UPLOAD_AVATAR,
  id: string,
  formData: FormData,
};

type ClearSubscriberType = {
  type: typeof CLEAR_SUBSCRIBER,
};

export type PublishRequestPasswordResetType = {
  type: typeof PUBLISH_REQUEST_PASSWORD_RESET,
  email: string,
};

export type PublishResetPasswordType = {
  type: typeof PUBLISH_REQUEST_PASSWORD_RESET,
  resetToken: string,
  password: string,
};

type DeleteSelfType = {
  type: typeof DELETE_SELF,
};

export type SubscriberActionType =
  | SetSubscriber
  | SetHereNow
  | UpdateSubscriberSuccessType
  | RemoveHereNowType
  | AddHereNowType
  | SetAvatarType
  | ClearSubscriberType;

// action creators
export const setHereNow = (channel: string, subscribers: Array<SubscriberState>): SetHereNow => (
  {
    type: SET_HERE_NOW,
    channel,
    subscribers,
  }
);

export const addHereNow = (channel: string, subscriber: SubscriberState): AddHereNowType => (
  {
    type: ADD_HERE_NOW,
    channel,
    subscriber,
  }
);

export const removeHereNow = (channel: string, subscriberToken: string): RemoveHereNowType => (
  {
    type: REMOVE_HERE_NOW,
    subscriberToken,
    channel,
  }
);

export const setSubscriber = (subscriber: PrivateSubscriberType): SetSubscriber => (
  {
    type: SET_SUBSCRIBER,
    subscriber,
  }
);

export const setAvatar = (url: string): SetAvatarType => (
  {
    type: SET_AVATAR,
    url,
  }
);

export const receiveMuteSubscriber = (nickname:string): ReceiveMuteSubscriberType => (
  {
    type: RECEIVE_MUTE_SUBSCRIBER,
    nickname,
  }
);

export const publishMuteSubscriber = (channelId:string, subscriberName:string): PublishMuteSubscriberType => (
  {
    type: PUBLISH_MUTE_SUBSCRIBER,
    channelId,
    subscriberName,
  }
);

export const updateTextMode = (mode:TextModeType) => (
  {
    preferences: {
      textMode: mode,
    },
  }
);

export const uploadAvatar = (id: string, formData:FormData):UploadAvatarType => (
  {
    type: UPLOAD_AVATAR,
    id,
    formData,
  }
);

export const updateSubscriber = (id: string, input: SubscriberInputType): UpdateSubscriberType => (
  {
    type: UPDATE_SUBSCRIBER,
    id,
    input,
  }
);

export const updateSubscriberSuccess = (input: SubscriberInputType): UpdateSubscriberSuccessType => (
  {
    type: UPDATE_SUBSCRIBER_SUCCESS,
    input,
  }
);

export const updateGuestNickname = (id: string, nickname: string): UpdateGuestNicknameType => (
  {
    type: UPDATE_GUEST_NICKNAME,
    id,
    nickname,
  }
);

export const clearSubscriber = () => (
  {
    type: CLEAR_SUBSCRIBER,
  }
);

export const publishRequestPasswordReset = (
  email: string
): PublishRequestPasswordResetType => (
  {
    type: PUBLISH_REQUEST_PASSWORD_RESET,
    email,
  }
);

export const publishResetPassword = (
  resetToken: string,
  password: string
): PublishResetPasswordType => (
  {
    type: PUBLISH_RESET_PASSWORD,
    resetToken,
    password,
  }
);

export const deleteSelf = ():DeleteSelfType => (
  {
    type: DELETE_SELF,
  }
);

// default
export const defaultState = {
  hereNow: {},
  currentSubscriber: {
    userId: 0,
    id: '',
    nickname: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
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
  mutedSubscribers: [],
};

// reducer
export default (
  state: SubscriberStateType = defaultState,
  action?: SubscriberActionType): SubscriberStateType => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
    case SET_HERE_NOW:
      return {
        ...state,
        hereNow: {
          ...state.hereNow,
          [action.channel]: action.subscribers,
        },
      };
    case ADD_HERE_NOW:
      return {
        ...state,
        hereNow: {
          ...state.hereNow,
          [action.channel]: [
            ...state.hereNow[action.channel] || [],
            action.subscriber,
          ],
        },
      };
    case UPDATE_HERE_NOW: {
      const { subscriber } = action;
      return {
        ...state,
        hereNow: {
          ...state.hereNow,
          [action.channel]: (state.hereNow[action.channel] || []).map(item => (
            item.id === subscriber.id ? subscriber : item
          )),
        },
      };
    }
    case REMOVE_HERE_NOW: {
      if (state.hereNow[action.channel]) {
        const { subscriberToken } = action;
        return {
          ...state,
          hereNow: {
            ...state.hereNow,
            [action.channel]: state.hereNow[action.channel].filter(item => item.id !==  subscriberToken),
          },
        };
      } else {
        return state;
      }
    }
    case SET_SUBSCRIBER:
      return {
        ...state,
        currentSubscriber: action.subscriber,
      };
    case RECEIVE_MUTE_SUBSCRIBER: {
      const newArray = [...state.mutedSubscribers, action.nickname];
      return {
        ...state,
        // ensure no duplicates in the array
        mutedSubscribers: [...new Set(newArray)],
      };
    }
    case UPDATE_SUBSCRIBER_SUCCESS: {
      return {
        ...state,
        currentSubscriber: {
          ...state.currentSubscriber,
          ...action.input,
        },
      };
    }
    case SET_AVATAR: {
      return {
        ...state,
        currentSubscriber: {
          ...state.currentSubscriber,
          avatar: action.url,
        },
      };
    }
    case CLEAR_SUBSCRIBER: {
      return {
        ...state,
        currentSubscriber: {
          ...defaultState.currentSubscriber,
        },
      };
    }
  }
  return state;
};

// Selectors
type StateType = ChopStateType | SubscriberStateType;
const local = (state: StateType): SubscriberStateType => state.currentSubscriber ? state : state.subscriber;

export const getCurrentSubscriberAvatar = (state: StateType): ?string => local(state).currentSubscriber.avatar;

export const getCurrentSubscriber = (state: StateType): PrivateSubscriberType => local(state).currentSubscriber;

export const checkForPermissions = (subscriber: PrivateSubscriberType, requiredPermissions: Array<string>, requireAll: boolean): boolean => {
  if (requireAll) {
    return requiredPermissions.every(
      permission => subscriber.role.permissions.includes(permission)
    );
  } else {
    return subscriber.role.permissions.some(
      permission => requiredPermissions.includes(permission)
    );
  }
};

export const privateSubscriberToSharedSubscriber = (subscriber: PrivateSubscriberType): SharedSubscriberType => {
  const { id, nickname, avatar, role: { label }} = subscriber;
  return {
    id,
    nickname,
    avatar,
    role: {
      label,
    },
  };
};

export const hasPermissions = createSelector(
  getCurrentSubscriber,
  (_state, requiredPermissions, _requireAll) => requiredPermissions,
  (_state, _requiredPermissions, requireAll) => requireAll,
  checkForPermissions
);

export const getCurrentSubscriberAsSharedSubscriber = createSelector<StateType, void, SharedSubscriberType, PrivateSubscriberType>(
  [getCurrentSubscriber],
  privateSubscriberToSharedSubscriber
);

export const getTextMode = createSelector<StateType, void, SharedSubscriberType, TextModeType>(
  [getCurrentSubscriber],
  subscriber => subscriber.preferences.textMode
);

export const isHost = createSelector<StateType, void, SharedSubscriberType, PrivateSubscriberType>(
  [getCurrentSubscriber],
  subscriber => subscriber.role.label === 'Host' || subscriber.role.label === 'Admin'
);

const getHereNow = (state: StateType): HereNowChannels => local(state).hereNow;

const getSubscribersInChannel = (state: StateType, channel:string): Array<SubscriberState> => (
  getHereNow(state)[channel] || []
);

export const getSubscriberCountInChannel = createSelector<StateType, string, number, Array<SubscriberState>>(
  [getSubscribersInChannel],
  subscribers => subscribers.length
);

export const getMutedSubscribers = (state: StateType):Array<UIDType>  => local(state).mutedSubscribers;
