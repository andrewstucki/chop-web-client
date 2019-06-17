// @flow
import type {BasicAuthLoginType} from '../../login/dux';
import type {Saga} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import queries, {setAccessToken} from '../queries';
import { queryCurrentEvent } from '../../event/dux';
import { setAuthentication, BASIC_AUTH_LOGIN_FAILED, BASIC_AUTH, GUEST_AUTH, REFRESH_TOKEN, LEGACY_TOKEN, TOKEN_AUTH_LOGIN_FAILED } from '../../auth/dux';
import bugsnagClient from '../../util/bugsnag';
import {getAccessToken, getRefreshToken} from '../../selectors/authSelectors';
import {currentEvent} from './currentEvent';
import {getLegacyToken} from '../legacyToken';
import { loggedInBanner } from '../../banner/dux';
import { togglePopUpModal } from '../../popUpModal/dux';

function* authenticateByBasicAuth (action: BasicAuthLoginType): Saga<void> {
  try {
    const result = yield call([queries, queries.authenticateByBasicAuth], action.email, action.password);
    if (result.authenticate.errors.length === 0) {
      const { accessToken, refreshToken } = result.authenticate;
      setAccessToken(accessToken);
      yield put(setAuthentication(accessToken, refreshToken, BASIC_AUTH));
      yield put(queryCurrentEvent());
      yield put(togglePopUpModal());
      yield put(loggedInBanner());
    } else {
      yield put({type: BASIC_AUTH_LOGIN_FAILED});
    }
  } catch (error) {
    yield put({type: BASIC_AUTH_LOGIN_FAILED, error});
    bugsnagClient.notify(error);
  }
}

function* authenticateByGuestAuth (): Saga<void> {
  try {
    const result = yield call([queries, queries.authenticateByGuestAuth]);
    const { accessToken, refreshToken } = result.authenticate;
    setAccessToken(accessToken);
    yield put(setAuthentication(accessToken, refreshToken, GUEST_AUTH));
    yield call(currentEvent);
  } catch (error) {
    bugsnagClient.notify(error);
  }
}

function* authenticateByToken (): Saga<void> {
  try {
    const accessToken = yield select(getAccessToken);
    const legacyToken = getLegacyToken();
    if (accessToken) {
      yield call(setAccessToken, accessToken);
      try {
        yield call(currentEvent);
      } catch (_error) {
        const refresh = yield select(getRefreshToken);
        if (refresh) {
          const result = yield call([queries, queries.authenticateByRefreshToken], refresh);
          const {accessToken, refreshToken} = result.authenticate;
          yield put(setAuthentication(accessToken, refreshToken, REFRESH_TOKEN));
          yield call(currentEvent);
        }
      }
    } else if (legacyToken) {
      const result = yield call([queries, queries.authenticateByLegacyToken], legacyToken);
      const {accessToken, refreshToken} = result.authenticate;
      yield put(setAuthentication(accessToken, refreshToken, LEGACY_TOKEN));
      yield call(currentEvent);
    } else {
      yield call(authenticateByGuestAuth);
    }
  } catch (error) {
    yield put({type: TOKEN_AUTH_LOGIN_FAILED, error});
    bugsnagClient.notify(error);
  }
}

export {
  authenticateByBasicAuth,
  authenticateByToken,
  authenticateByGuestAuth,
};
