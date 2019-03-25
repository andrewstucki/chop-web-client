// @flow
import { all, call, put, takeLatest } from 'redux-saga/effects';
import queries from './queries';
import {
  PUBLISH_MUTE_USER,
  MUTE_USER_SUCCEEDED,
  MUTE_USER_FAILED,
} from '../moment/message/dux';
import bugsnagClient from '../util/bugsnag';
import type {PublishMuteUserType} from '../moment/message/dux';
import type {Saga} from 'redux-saga';
import {REMOVE_CHANNEL, REMOVE_CHANNEL_SUCCEEDED, REMOVE_CHANNEL_FAILED, removeAuthentication} from '../feed/dux';
import type {RemoveChannelType} from '../feed/dux';
import {addError} from '../errors/dux';

// eslint-disable-next-line no-console
const log = message => console.log(message);

function* handleDataFetchErrors (payload: any): Saga<void> {
  if (payload?.response?.errors) {
    const { response: { errors } } = payload;
    yield call(log, 'The graphql response returned errors:');
    for (const err in errors) {
      const { message, extensions } = errors[err];

      if (message) {
        yield put(addError(message));
        yield call(log, ` - ${message}`);
      }
      if (extensions) {
        const { code = '' } = extensions;
        if (code) {
          switch (code) {
            case 'UNAUTHORIZED':
              yield put(removeAuthentication());
          }
        }
      }
    }
  } else {
    yield call(log, 'The graphql response returned an error code but no error messages.');
  }
}

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

function* removeChannel (action: RemoveChannelType): Saga<void> {
  try {
    const result = yield call([queries, queries.leaveChannel], action.channel);
    if (result.leaveFeed) {
      yield put({type: REMOVE_CHANNEL_SUCCEEDED});
    } else {
      yield put({type: REMOVE_CHANNEL_FAILED, error: 'Server returned false for leaveFeed'});
      bugsnagClient.notify(new Error('Server returned false for leaveFeed'));
    }
  } catch (error) {
    yield put({type: REMOVE_CHANNEL_FAILED, error: error.message});
    bugsnagClient.notify(error);
  }
}

function* watchPublishMuteUser (): Saga<void> {
  yield takeLatest(PUBLISH_MUTE_USER, muteUser);
}

function* watchRemoveChannel (): Saga<void> {
  yield takeLatest(REMOVE_CHANNEL, removeChannel);
}

function* watchRemoveChannelFailed (): Saga<void> {
  yield takeLatest(REMOVE_CHANNEL_FAILED, handleDataFetchErrors);
}

export default function* rootSaga (): Saga<void> {
  yield all([
    call(watchPublishMuteUser),
    call(watchRemoveChannel),
    call(watchRemoveChannelFailed),
  ]);
}

export {
  watchPublishMuteUser,
  muteUser,
  removeChannel,
};
