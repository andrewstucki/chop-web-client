// @flow
import type {UpdateUserType} from '../../users/dux';
import type {Saga} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import queries from '../queries';
import {UPDATE_USER_FAILED, updateUserSucceeded} from '../../users/dux';
import { textModeNotificationBanner } from '../../banner/dux';
import bugsnagClient from '../../util/bugsnag';

function* updateUser (action: UpdateUserType): Saga<void> {
  try {
    const result = yield call([queries, queries.updateUser], action.id, action.input);
    if (result.updateUser) {
      yield put(
        updateUserSucceeded(result.updateUser)
      );
      if (action.input.preferences.textMode) {
        yield put (textModeNotificationBanner(action.input.preferences.textMode));
      } 
    } else {
      yield put({type: UPDATE_USER_FAILED, id: action.id, error: `Server returned false for updateUser: ${action.id}`});
      bugsnagClient.notify(new Error(`Server returned false for updateUser: ${action.id}`));
    }
  } catch (error) {
    yield put({type: UPDATE_USER_FAILED, name: action.id, error: error.message});
    bugsnagClient.notify(error);
  }
}

export {
  updateUser,
};