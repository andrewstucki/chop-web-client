// @flow
import { call, put, takeLatest } from 'redux-saga/effects';
import GraphQl from './graphQL';
import {
  PUBLISH_MUTE_USER,
  MUTE_USER_SUCCEEDED,
  MUTE_USER_FAILED,
} from '../moment/message/dux';
import bugsnagClient from '../util/bugsnag';
import type {PublishMuteUserType} from '../moment/message/dux';
import type {Saga} from 'redux-saga';

const graph = new GraphQl();

function* muteUser (action: PublishMuteUserType): Saga<void> {
  try {
    const success = yield call(graph.muteUser, action.channelId, action.userName);
    if (success.muteUser) {
      yield put({type: MUTE_USER_SUCCEEDED, name: action.userName});
    } else {
      yield put({type: MUTE_USER_FAILED, name: action.userName, error: 'Server returned false'});
      bugsnagClient.notify(new Error(`Server returned false for muteUser: ${action.userName}`));
    }
  } catch (error) {
    yield put({type: MUTE_USER_FAILED, name: action.userName, error: error.message});
    bugsnagClient.notify(error);
  }
}

function* mySaga (): Saga<void> {
  yield takeLatest(PUBLISH_MUTE_USER, muteUser);
}

export default mySaga;

export {
  muteUser,
};
