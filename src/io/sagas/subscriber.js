// @flow
import type {UpdateSubscriberType} from '../../subscriber/dux';
import type {Saga} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import queries from '../queries';
import {UPDATE_SUBSCRIBER_FAILED, updateSubscriberSucceeded} from '../../subscriber/dux';
import { textModeNotificationBanner } from '../../banner/dux';
import bugsnagClient from '../../util/bugsnag';

function* updateSubscriber (action: UpdateSubscriberType): Saga<void> {
  try {
    const result = yield call([queries, queries.updateSubscriber], action.id, action.input);
    if (result) {
      yield put(updateSubscriberSucceeded(action.input));
      if (action.input.preferences.textMode) {
        yield put (textModeNotificationBanner(action.input.preferences.textMode));
      } 
    } else {
      yield put({type: UPDATE_SUBSCRIBER_FAILED, id: action.id, error: `Server returned false for updateSubscriber: ${action.id}`});
      bugsnagClient.notify(new Error(`Server returned false for updateSubscriber: ${action.id}`));
    }
  } catch (error) {
    yield put({type: UPDATE_SUBSCRIBER_FAILED, name: action.id, error: error.message});
    bugsnagClient.notify(error);
  }
}

export {
  updateSubscriber,
};
