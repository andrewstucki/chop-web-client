// @flow
import { all, takeEvery, takeLeading } from 'redux-saga/effects';
import {
  DIRECT_CHAT,
  DIRECT_CHAT_FAILED,
} from '../moment/message/dux';
import type {Saga} from 'redux-saga';
import {
  LEAVE_CHANNEL,
  LEAVE_CHANNEL_FAILED,
  JOIN_CHANNEL,
} from '../feed/dux';
import {
  QUERY_CURRENT_EVENT,
  QUERY_CURRENT_EVENT_FAILED,
} from '../event/dux';
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
  basicAuth,
  guestAuth,
  checkAuth,
  logout,
  init,
} from './sagas/auth';
import {
  leaveChannel,
  directChat,
  publishAcceptedPrayerRequest,
  joinChannel,
} from './sagas/privateChat';
import {
  muteSubscriber,
} from './sagas/moderation';
import {
  updateSubscriber,
  uploadAvatar,
  requestPasswordReset,
  resetPassword,
  updateGuestNickname,
  deleteSelf,
} from './sagas/subscriber';
import {
  handleDataFetchErrors,
} from './sagas/errorHandling';
import {
  PUBNUB_PUBLISH_FAILED,
  publishMomentToChannel,
  setPubnubClient,
  handlePubnubErrors,
} from './sagas/pubnub';
import { GENERATE_PDF } from '../eventNotes/dux';
import { generatePdf } from './sagas/generatePdf';
import {
  UPDATE_SUBSCRIBER,
  PUBLISH_REQUEST_PASSWORD_RESET,
  PUBLISH_RESET_PASSWORD,
  PUBLISH_MUTE_SUBSCRIBER,
  UPLOAD_AVATAR,
  UPDATE_GUEST_NICKNAME,
  DELETE_SELF,
} from '../subscriber/dux';
import { RESET_APP } from '../chop/dux';

function* rootSaga (): Saga<void> {
  yield all([
    takeEvery(PUBLISH_MUTE_SUBSCRIBER, muteSubscriber),
    takeEvery(LEAVE_CHANNEL, leaveChannel),
    takeEvery(LEAVE_CHANNEL_FAILED, handleDataFetchErrors),
    takeEvery(DIRECT_CHAT, directChat),
    takeEvery(DIRECT_CHAT_FAILED, handleDataFetchErrors),
    takeEvery(PUBLISH_ACCEPTED_PRAYER_REQUEST, publishAcceptedPrayerRequest),
    takeEvery(PUBLISH_ACCEPTED_PRAYER_REQUEST_FAILED, handleDataFetchErrors),
    takeEvery(BASIC_AUTH_LOGIN, basicAuth),
    takeEvery(BASIC_AUTH_LOGIN_FAILED, handleDataFetchErrors),
    takeEvery(REHYDRATE, init),
    takeEvery(RESET_APP, logout),
    takeEvery(QUERY_CURRENT_EVENT, currentEvent),
    takeEvery(QUERY_CURRENT_EVENT_FAILED, handleDataFetchErrors),
    takeEvery(QUERY_SCHEDULE_FAILED, handleDataFetchErrors),
    takeEvery(PUBLISH_MOMENT_TO_CHANNEL, publishMomentToChannel),
    takeEvery(PUBNUB_PUBLISH_FAILED, handlePubnubErrors),
    takeLeading('*', setPubnubClient),
    takeEvery(JOIN_CHANNEL, joinChannel),
    takeEvery(UPDATE_SUBSCRIBER, updateSubscriber),
    takeEvery(UPDATE_GUEST_NICKNAME, updateGuestNickname),
    takeEvery(GENERATE_PDF, generatePdf),
    takeEvery(UPLOAD_AVATAR, uploadAvatar),
    takeEvery(PUBLISH_REQUEST_PASSWORD_RESET, requestPasswordReset),
    takeEvery(PUBLISH_RESET_PASSWORD, resetPassword),
    takeEvery(DELETE_SELF, deleteSelf),
  ]);
}

export {
  muteSubscriber,
  updateSubscriber,
  leaveChannel,
  directChat,
  publishAcceptedPrayerRequest,
  basicAuth,
  checkAuth,
  guestAuth,
  rootSaga,
  publishMomentToChannel,
  joinChannel,
  generatePdf,
  uploadAvatar,
  requestPasswordReset,
  updateGuestNickname,
  deleteSelf,
  logout,
  init,
};
