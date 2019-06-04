// @flow
import type {BasicAuthLoginType} from '../../login/dux';
import type {Saga} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import queries, {setAccessToken} from '../queries';
import { setAuthentication, TOKEN_AUTH_LOGIN_FAILED } from '../../feed/dux';
import { queryCurrentEvent } from '../../event/dux';
import {BASIC_AUTH_LOGIN_FAILED} from '../../login/dux';
import bugsnagClient from '../../util/bugsnag';
import {getAccessToken, getRefreshToken} from '../../selectors/authSelectors';
import {currentEvent} from './currentEvent';
import {getLegacyToken} from '../legacyToken';

function* authenticateByBasicAuth (action: BasicAuthLoginType): Saga<void> {
  try {
    const result = yield call([queries, queries.authenticateByBasicAuth], action.email, action.password);
    const { accessToken, refreshToken } = result.authenticate;
    yield put(setAuthentication(accessToken, refreshToken));
    yield put(queryCurrentEvent());
  } catch (error) {
    yield put({type: BASIC_AUTH_LOGIN_FAILED, error});
    bugsnagClient.notify(error);
  }
}

function* authenticateByToken (): Saga<void> {
  try {
    const accessToken = yield select(getAccessToken);
    if (accessToken) {
      yield call(setAccessToken, accessToken);
      try {
        yield call(currentEvent);
      } catch (_error) {
        const refresh = yield select(getRefreshToken);
        if (refresh) {
          const result = yield call([queries, queries.authenticateByRefreshToken], refresh);
          const {accessToken, refreshToken} = result.authenticate;
          yield put(setAuthentication(accessToken, refreshToken));
          yield call(currentEvent);
        }
      }
    } else {
      const legacyToken = getLegacyToken();
      if (legacyToken) {
        const result = yield call([queries, queries.authenticateByLegacyToken], legacyToken);
        const {accessToken, refreshToken} = result.authenticate;
        yield put(setAuthentication(accessToken, refreshToken));
        yield call(currentEvent);
      }
    }
  } catch (error) {
    yield put({type: TOKEN_AUTH_LOGIN_FAILED, error});
    bugsnagClient.notify(error);
  }
}

export {
  authenticateByBasicAuth,
  authenticateByToken,
};
