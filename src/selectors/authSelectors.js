// @flow
import { createSelector } from 'reselect';
import type {AuthenticationType} from '../auth/dux';
import type { ChopStateType } from '../chop/dux';

const ID = 'feed';

const local = state => state[ID] || state;

const getAuth = state => local(state).auth;

const getAccessToken = createSelector<ChopStateType, void, string, AuthenticationType>(
  getAuth,
  auth => auth?.accessToken
);

const getRefreshToken = createSelector<ChopStateType, void, string, AuthenticationType>(
  getAuth,
  auth => auth?.refreshToken
);

export {
  getAccessToken,
  getRefreshToken,
};