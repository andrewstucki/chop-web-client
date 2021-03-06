// @flow
import  { BASIC_AUTH_LOGIN_FAILED, type BasicAuthLoginType } from '../../login/dux';
import type {Saga} from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import bugsnagClient from '../../util/bugsnag';
import {currentEvent} from './currentEvent';
import { errorBanner, loggedInBanner } from '../../banner/dux';
import { togglePopUpModal } from '../../popUpModal/dux';
import { API } from '../API';
import Cookie from 'js-cookie';
import { loginEvent } from './metrics';
import { createUid } from '../../util';

type SuccessType = {
  success:boolean,
};

type ErrorType = {
  code: string,
  message: string,
  request_id: string,
};

type AuthResponse = {
  access_token: string,
  refresh_token: string,
  errors: Array<ErrorType>
};

function* init (): Saga<void> {
  try {
    const legacy_token = Cookie.get('legacy_token');
    if (legacy_token) {
      const response:AuthResponse = yield call([API, API.post], '/auth/legacy', { legacy_token });
      if (response?.errors?.length === 0) {
        yield put(loggedInBanner());
        yield call(currentEvent);
      } else {
        throw new Error(response.errors[0].message);
      }
    } else {
      yield call(checkAuth);
    }
  } catch (error) {
    yield call(guestAuth);
    bugsnagClient.notify(error);
  }
}

function* checkAuth (): Saga<void> {
  try {
    const response:SuccessType = yield call([API, API.get], '/auth/check');
    if (response.success) {
      yield put(loggedInBanner());
      yield call(currentEvent);
    } else {
      yield call(guestAuth);
    }
  } catch (error) {
    yield call(guestAuth);
    bugsnagClient.notify(error);
  }
}

function* guestAuth (): Saga<void> {
  try {
    const response:AuthResponse = yield call([API, API.post], '/auth/guest');
    if (response?.errors?.length === 0) {
      yield call(currentEvent);
    } else {
      throw new Error(response.errors[0].message);
    }
  } catch (error) {
    yield put(errorBanner('error'));
    bugsnagClient.notify(error);
  }
}

function* basicAuth (action: BasicAuthLoginType): Saga<void> {
  try {
    const { email, password } = action;
    const response:AuthResponse = yield call([API, API.post], '/auth/basic', { email, password });
    if (response?.errors?.length === 0) {
      yield call(loginEvent);
      yield put(togglePopUpModal());
      yield put(loggedInBanner());
      yield call(currentEvent);
    } else {
      throw new Error(response.errors[0].message);
    }
  } catch (error) {
    yield put({type: BASIC_AUTH_LOGIN_FAILED, error});
    bugsnagClient.notify(error);
  }
}

function* logout (): Saga<void> {
  try {
    yield call([API, API.post], '/auth/logout');
    yield call(guestAuth);
    Cookie.set('SESSIONID', createUid);
  } catch (error) {
    yield call(guestAuth);
    bugsnagClient.notify(error);
  }
}

export {
  init,
  basicAuth,
  guestAuth,
  checkAuth,
  logout,
};
