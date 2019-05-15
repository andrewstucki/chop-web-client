// @flow
import type {PublishMuteUserType} from '../../moment';
import type {Saga} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import queries from '../queries';
import {MUTE_USER_FAILED, MUTE_USER_SUCCEEDED} from '../../users/dux';
import bugsnagClient from '../../util/bugsnag';

function* muteUser (action: PublishMuteUserType): Saga<void> {
  try {
    const result = yield call([queries, queries.muteUser], action.channelId, action.userName);
    if (result.muteUser) {
      yield put({type: MUTE_USER_SUCCEEDED, name: action.userName});
    } else {
      yield put({type: MUTE_USER_FAILED, name: action.userName, error: `Server returned false for muteUser: ${action.userName}`});
      bugsnagClient.notify(new Error(`Server returned false for muteUser: ${action.userName}`));
    }
  } catch (error) {
    yield put({type: MUTE_USER_FAILED, name: action.userName, error: error.message});
    bugsnagClient.notify(error);
  }
}

export {
  muteUser,
};