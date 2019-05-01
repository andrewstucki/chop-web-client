// @flow
import { createSelector } from 'reselect';
import type {FeedType, AuthenticationType} from '../feed/dux';

const getAuth = state => state?.feed?.auth;

const getAccessToken = createSelector<{feed: FeedType}, void, string, AuthenticationType>(
  getAuth,
  auth => auth?.accessToken
);

const getRefreshToken = createSelector<{feed: FeedType}, void, string, AuthenticationType>(
  getAuth,
  auth => auth?.refreshToken
);

export {
  getAccessToken,
  getRefreshToken,
};