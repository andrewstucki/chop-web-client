// @flow
import type {RemoveChannelType} from '../../feed/dux';
import type {Saga} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import queries from '../queries';
import {addChannel, REMOVE_CHANNEL_FAILED, REMOVE_CHANNEL_SUCCEEDED} from '../../feed/dux';
import bugsnagClient from '../../util/bugsnag';
import type {PublishAcceptedPrayerRequestType, PublishDirectChatType} from '../../moment';
import {convertSubscribersToSharedUsers} from '../../util';
import {setPrimaryPane} from '../../pane/dux';
import {CHAT} from '../../pane/content/chat/dux';
import {DIRECT_CHAT_FAILED, PUBLISH_ACCEPTED_PRAYER_REQUEST_FAILED} from '../../moment';
import {getAvailableForPrayer} from '../../selectors/hereNowSelector';

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

export {
  removeChannel,
  directChat,
  publishAcceptedPrayerRequest,
};