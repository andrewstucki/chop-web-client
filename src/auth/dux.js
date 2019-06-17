// @flow

// Action Types
export const SET_AUTHENTICATION = 'SET_AUTHENTICATION';
export const REMOVE_AUTHENTICATION = 'REMOVE_AUTHENTICATION';
export const TOKEN_AUTH_LOGIN_FAILED = 'TOKEN_AUTH_LOGIN_FAILED';
export const BASIC_AUTH_LOGIN_FAILED = 'BASIC_AUTH_LOGIN_FAILED';
export const BASIC_AUTH = 'BASIC_AUTH';
export const GUEST_AUTH = 'GUEST_AUTH';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const LEGACY_TOKEN = 'LEGACY_TOKEN';
export const PUBLISH_GUEST_AUTH = 'PUBLISH_GUEST_AUTH';

type AuthType = 
  | typeof BASIC_AUTH
  | typeof GUEST_AUTH
  | typeof REFRESH_TOKEN
  | typeof LEGACY_TOKEN;

// Flow Type Definitions
export type AuthenticationType = {
  accessToken: string,
  refreshToken: string,
};

export type SetAuthenticationType = {
  type: typeof SET_AUTHENTICATION,
  auth: AuthenticationType,
  authType: AuthType,
};

export type RemoveAuthenticationType = {
  type: typeof REMOVE_AUTHENTICATION,
}

type PublishGuestAuthType = {
  type: typeof PUBLISH_GUEST_AUTH,
};

// Action Creators
export const setAuthentication = (accessToken: string, refreshToken: string, authType: AuthType): SetAuthenticationType => (
  {
    type: SET_AUTHENTICATION,
    auth: {
      accessToken,
      refreshToken,
    },
    authType,
  }
);

export const removeAuthentication = (): RemoveAuthenticationType => (
  {
    type: REMOVE_AUTHENTICATION,
  }
);

export const guestAuth = (): PublishGuestAuthType => (
  {
    type: PUBLISH_GUEST_AUTH,
  }
);