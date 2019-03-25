// @flow
import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import queries from './queries';
import {
  PUBLISH_MUTE_USER,
  MUTE_USER_SUCCEEDED,
  MUTE_USER_FAILED,
  DIRECT_CHAT,
  DIRECT_CHAT_FAILED,
} from '../moment/message/dux';
import bugsnagClient from '../util/bugsnag';
import type {PublishMuteUserType, PublishDirectChatType} from '../moment/message/dux';
import type {Saga} from 'redux-saga';
import {
  REMOVE_CHANNEL,
  REMOVE_CHANNEL_SUCCEEDED,
  REMOVE_CHANNEL_FAILED,
  removeAuthentication,
  addChannel,
} from '../feed/dux';
import type {RemoveChannelType} from '../feed/dux';
import {addError} from '../errors/dux';
import {convertSubscribersToSharedUsers} from '../util';
import {setPrimaryPane} from '../pane/dux';
import {CHAT} from '../pane/content/chat/dux';
import {
  PUBLISH_ACCEPTED_PRAYER_REQUEST,
  PUBLISH_ACCEPTED_PRAYER_REQUEST_FAILED,
} from '../moment';
import type {PublishAcceptedPrayerRequestType} from '../moment';
import {getAvailableForPrayer} from '../selectors/hereNowSelector';

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

function* directChat (action: PublishDirectChatType): Saga<void> {
  try {
    const result = yield call([queries, queries.directChat], action.otherUserPubnubToken, action.otherUserNickname);
    const { name, id, direct, subscribers } = result.createDirectFeed;
    const participants = convertSubscribersToSharedUsers(subscribers);
    yield put(addChannel(name, id, direct, participants));
    yield put(setPrimaryPane(CHAT, id));
  } catch (error) {
    yield put({type: DIRECT_CHAT_FAILED, error: error.message});
    bugsnagClient.notify(error);
  }
}

function* publishAcceptedPrayerRequest (action: PublishAcceptedPrayerRequestType): Saga<void> {
  try {
    const { userRequestingPrayer: { pubnubToken, name }, prayerChannel } = action;
    const availableForPrayer = yield select(state => getAvailableForPrayer(state.feed));

    const result = yield call([queries, queries.acceptPrayer], prayerChannel, pubnubToken, availableForPrayer, name);
    const { name: channelName, id, direct, subscribers } = result.acceptPrayer;
    const participants = convertSubscribersToSharedUsers(subscribers);
    yield put(addChannel(channelName, id, direct, participants));
    yield put(setPrimaryPane(CHAT, id));
  } catch (error) {
    yield put({type: PUBLISH_ACCEPTED_PRAYER_REQUEST_FAILED, error: error.message});
    bugsnagClient.notify(error);
  }
}

export default function* rootSaga (): Saga<void> {
  yield all([
    takeEvery(PUBLISH_MUTE_USER, muteUser),
    takeEvery(REMOVE_CHANNEL, removeChannel),
    takeEvery(REMOVE_CHANNEL_FAILED, handleDataFetchErrors),
    takeEvery(DIRECT_CHAT, directChat),
    takeEvery(DIRECT_CHAT_FAILED, handleDataFetchErrors),
    takeEvery(PUBLISH_ACCEPTED_PRAYER_REQUEST, publishAcceptedPrayerRequest),
    takeEvery(PUBLISH_ACCEPTED_PRAYER_REQUEST_FAILED, handleDataFetchErrors),
  ]);
}

export {
  muteUser,
  removeChannel,
  directChat,
  publishAcceptedPrayerRequest,
};
