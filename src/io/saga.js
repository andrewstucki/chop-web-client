// @flow
import { all, call, put, takeEvery, select } from 'redux-saga/effects';
import queries, {setAccessToken} from './queries';
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
  TOKEN_AUTH_LOGIN_FAILED,
  removeAuthentication,
  addChannel,
  setAuthentication,
  queryCurrentEvent,
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
import { getAccessToken, getRefreshToken } from '../selectors/authSelectors';
import type {BasicAuthLoginType} from '../login/dux';
import {
  BASIC_AUTH_LOGIN,
  BASIC_AUTH_LOGIN_FAILED,
} from '../login/dux';
import { REHYDRATE } from 'redux-persist/lib/constants';
import {getLegacyToken} from './legacyToken';

// eslint-disable-next-line no-console
const log = message => console.log(message);

function* handleDataFetchErrors (payload: any): Saga<void> {
  if (payload?.response?.errors) {
    const { response: { errors } } = payload;
    yield call(log, 'The graphql response returned errors:');
    for (const err in errors) {
      const { message, extensions, path } = errors[err];

      if (message) {
        yield put(addError(message));
        yield call(log, ` - ${message}`);
      }
      if (
        extensions && extensions.code === 'UNAUTHORIZED' ||
        extensions && extensions.code === 'INTERNAL_SERVER_ERROR' && path === 'authenticate'
      ) {
        yield put(removeAuthentication());
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

function* authenticateByBasicAuth (action: BasicAuthLoginType): Saga<void> {
  try {
    const result = yield call([queries, queries.authenticateByBasicAuth], action.email, action.password);
    const { accessToken, refreshToken } = result.authenticate;
    yield put(setAuthentication(accessToken, refreshToken));
    yield put(queryCurrentEvent());
  } catch (error) {
    yield put({type: BASIC_AUTH_LOGIN_FAILED, error: error.message});
    bugsnagClient.notify(error);
  }
}

function* authenticateByToken (): Saga<void> {
  try {
    const accessToken = yield select(getAccessToken);
    if (accessToken) {
      yield call(setAccessToken, accessToken);
      try {
        yield put(queryCurrentEvent());
      } catch (_error) {
        const refresh = yield select(getRefreshToken);
        if (refresh) {
          const result = yield call([queries, queries.authenticateByRefreshToken], refresh);
          const {accessToken, refreshToken} = result.authenticate;
          yield put(setAuthentication(accessToken, refreshToken));
          yield put(queryCurrentEvent());
        }
      }
    } else {
      const legacyToken = getLegacyToken();
      if (legacyToken) {
        const result = yield call([queries, queries.authenticateByLegacyToken], legacyToken);
        const {accessToken, refreshToken} = result.authenticate;
        yield put(setAuthentication(accessToken, refreshToken));
        yield put(queryCurrentEvent());
      }
    }
  } catch (error) {
    yield put({type: TOKEN_AUTH_LOGIN_FAILED, error: error.message});
    bugsnagClient.notify(error);
  }
}

// function* currentEvent (): Saga<void> {
//   yield call(log, 'noop');
// }

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
    // takeEvery(QUERY_CURRENT_EVENT, currentEvent),
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
