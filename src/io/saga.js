// @flow
import { all, takeEvery, takeLeading } from 'redux-saga/effects';
import {
  PUBLISH_MUTE_USER,
  DIRECT_CHAT,
  DIRECT_CHAT_FAILED,
} from '../moment/message/dux';
import type {Saga} from 'redux-saga';
import {
  LEAVE_CHANNEL,
  LEAVE_CHANNEL_FAILED,
  TOKEN_AUTH_LOGIN_FAILED,
  QUERY_CURRENT_EVENT,
  QUERY_CURRENT_EVENT_FAILED,
  JOIN_CHANNEL,
} from '../feed/dux';
import {
  QUERY_SCHEDULE_FAILED,
} from '../schedule/dux';
import {
  PUBLISH_ACCEPTED_PRAYER_REQUEST,
  PUBLISH_ACCEPTED_PRAYER_REQUEST_FAILED,
  PUBLISH_MOMENT_TO_CHANNEL,
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
  leaveChannel,
  directChat,
  publishAcceptedPrayerRequest,
  joinChannel,
} from './sagas/privateChat';
import {
  muteUser,
} from './sagas/moderation';
import {
  updateUser,
} from './sagas/user';
import {
  handleDataFetchErrors,
} from './sagas/errorHandling';
import {
  PUBNUB_PUBLISH_FAILED,
  publishMomentToChannel,
  setPubnubClient,
  handlePubnubErrors,
} from './sagas/pubnub';
import { UPDATE_USER } from '../users/dux';

function* rootSaga (): Saga<void> {
  yield all([
    takeEvery(PUBLISH_MUTE_USER, muteUser),
    takeEvery(LEAVE_CHANNEL, leaveChannel),
    takeEvery(LEAVE_CHANNEL_FAILED, handleDataFetchErrors),
    takeEvery(DIRECT_CHAT, directChat),
    takeEvery(DIRECT_CHAT_FAILED, handleDataFetchErrors),
    takeEvery(PUBLISH_ACCEPTED_PRAYER_REQUEST, publishAcceptedPrayerRequest),
    takeEvery(PUBLISH_ACCEPTED_PRAYER_REQUEST_FAILED, handleDataFetchErrors),
    takeEvery(BASIC_AUTH_LOGIN, authenticateByBasicAuth),
    takeEvery(BASIC_AUTH_LOGIN_FAILED, handleDataFetchErrors),
    takeEvery(REHYDRATE, authenticateByToken),
    takeEvery(TOKEN_AUTH_LOGIN_FAILED, handleDataFetchErrors),
    takeEvery(QUERY_CURRENT_EVENT, currentEvent),
    takeEvery(QUERY_CURRENT_EVENT_FAILED, handleDataFetchErrors),
    takeEvery(QUERY_SCHEDULE_FAILED, handleDataFetchErrors),
    takeEvery(PUBLISH_MOMENT_TO_CHANNEL, publishMomentToChannel),
    takeEvery(PUBNUB_PUBLISH_FAILED, handlePubnubErrors),
    takeLeading('*', setPubnubClient),
    takeEvery(JOIN_CHANNEL, joinChannel),
    takeEvery(UPDATE_USER, updateUser),
  ]);
}

export {
  muteUser,
  updateUser,
  leaveChannel,
  directChat,
  publishAcceptedPrayerRequest,
  authenticateByBasicAuth,
  authenticateByToken,
  rootSaga,
  publishMomentToChannel,
  joinChannel,
};
