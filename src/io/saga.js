// @flow
import { all, takeEvery } from 'redux-saga/effects';
import {
  PUBLISH_MUTE_USER,
  DIRECT_CHAT,
  DIRECT_CHAT_FAILED,
} from '../moment/message/dux';
import type {Saga} from 'redux-saga';
import {
  REMOVE_CHANNEL,
  REMOVE_CHANNEL_FAILED,
  TOKEN_AUTH_LOGIN_FAILED,
  QUERY_CURRENT_EVENT,
  QUERY_CURRENT_EVENT_FAILED,
} from '../feed/dux';
import {
  PUBLISH_ACCEPTED_PRAYER_REQUEST,
  PUBLISH_ACCEPTED_PRAYER_REQUEST_FAILED,
} from '../moment';
import {
  BASIC_AUTH_LOGIN,
  BASIC_AUTH_LOGIN_FAILED,
} from '../login/dux';
import { REHYDRATE } from 'redux-persist/lib/constants';
import { currentEvent } from './sagas/currentEvent';
import {
  authenticateByBasicAuth,
  authenticateByToken,
} from './sagas/auth';
import {
  removeChannel,
  directChat,
  publishAcceptedPrayerRequest,
} from './sagas/privateChat';
import {
  muteUser,
} from './sagas/moderation';
import {
  handleDataFetchErrors,
} from './sagas/errorHandling';

function* rootSaga (): Saga<void> {
  yield all([
    takeEvery(PUBLISH_MUTE_USER, muteUser),
    takeEvery(REMOVE_CHANNEL, removeChannel),
    takeEvery(REMOVE_CHANNEL_FAILED, handleDataFetchErrors),
    takeEvery(DIRECT_CHAT, directChat),
    takeEvery(DIRECT_CHAT_FAILED, handleDataFetchErrors),
    takeEvery(PUBLISH_ACCEPTED_PRAYER_REQUEST, publishAcceptedPrayerRequest),
    takeEvery(PUBLISH_ACCEPTED_PRAYER_REQUEST_FAILED, handleDataFetchErrors),
    takeEvery(BASIC_AUTH_LOGIN, authenticateByBasicAuth),
    takeEvery(BASIC_AUTH_LOGIN_FAILED, handleDataFetchErrors),
    takeEvery(REHYDRATE, authenticateByToken),
    takeEvery(TOKEN_AUTH_LOGIN_FAILED, handleDataFetchErrors),
    takeEvery(QUERY_CURRENT_EVENT, currentEvent),
    takeEvery(QUERY_CURRENT_EVENT_FAILED, currentEvent),
  ]);
}

export {
  muteUser,
  removeChannel,
  directChat,
  publishAcceptedPrayerRequest,
  authenticateByBasicAuth,
  authenticateByToken,
  rootSaga,
};
