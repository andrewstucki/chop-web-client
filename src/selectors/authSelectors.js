// @flow
import { createSelector } from 'reselect';

const getAuth = state => state?.feed?.auth;

const getAccessToken = createSelector(
  getAuth,
  auth => auth?.accessToken
);

const getRefreshToken = createSelector(
  getAuth,
  auth => auth?.refreshToken
);

export {
  getAccessToken,
  getRefreshToken,
};