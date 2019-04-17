// @flow
import type { LeaveChannelType, JoinChannelType } from '../../feed/dux';
import type { Saga } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import queries from '../queries';
import type { GraphQLParticipantsType } from '../queries';
import { addChannel, LEAVE_CHANNEL_FAILED, LEAVE_CHANNEL_SUCCEEDED, JOIN_CHANNEL_FAILED } from '../../feed/dux';
import bugsnagClient from '../../util/bugsnag';
import type { PublishAcceptedPrayerRequestType, PublishDirectChatType } from '../../moment';
import { setPrimaryPane } from '../../pane/dux';
import { CHAT } from '../../pane/content/chat/dux';
import { DIRECT_CHAT_FAILED, PUBLISH_ACCEPTED_PRAYER_REQUEST_FAILED } from '../../moment';
import { getAvailableForPrayer } from '../../selectors/hereNowSelector';
import type { SharedUserType } from '../../users/dux';

export const convertUser = (user: GraphQLParticipantsType):SharedUserType => {
  if (user.pubnubToken === null || user.name === null) {
    bugsnagClient.notify(new Error(`User has null pubnubToken or name {id: ${user.id || 'null'}, pubnubToken: ${user.pubnubToken || 'null'}, name: ${user.name || 'null'}`));
  }
  return {
    id: user.id || 0,
    name: user.name ? user.name : 'Guest',
    pubnubToken: user.pubnubToken ? user.pubnubToken : '0',
    avatar: user.avatar,
    role: {
      label: '',
    },
  };
};

function* leaveChannel (action: LeaveChannelType): Saga<void> {
  try {
    const result = yield call([queries, queries.leaveChannel], action.channel);
    if (result.leaveFeed) {
      yield put({type: LEAVE_CHANNEL_SUCCEEDED});
    } else {
      yield put({type: LEAVE_CHANNEL_FAILED, error: 'Server returned false for leaveFeed'});
      bugsnagClient.notify(new Error('Server returned false for leaveFeed'));
    }
  } catch (error) {
    yield put({type: LEAVE_CHANNEL_FAILED, error: error.message});
    bugsnagClient.notify(error);
  }
}

function* directChat (action: PublishDirectChatType): Saga<void> {
  try {
    const result = yield call([queries, queries.directChat], action.otherUserPubnubToken, action.otherUserNickname);
    const { name, id, direct, participants } = result.createDirectFeed;
    yield put(addChannel(name, id, direct, participants.map(convertUser)));
    yield put(setPrimaryPane(CHAT, id));
    return id;
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
    const { name: channelName, id, direct, participants } = result.acceptPrayer;
    yield put(addChannel(channelName, id, direct, participants.map(convertUser)));
    yield put(setPrimaryPane(CHAT, id));
  } catch (error) {
    yield put({type: PUBLISH_ACCEPTED_PRAYER_REQUEST_FAILED, error: error.message});
    bugsnagClient.notify(error);
  }
}

function* joinChannel (action: JoinChannelType): Saga<void> {
  try {
    const { channel, requesterPubnubToken, requesterNickname } = action;
    const result = yield call([queries, queries.joinChannel], channel, requesterPubnubToken, requesterNickname);
    const { name: channelName, id, direct, participants } = result.joinFeed;
    yield put(addChannel(channelName, id, direct, participants.map(convertUser)));
  } catch (error) {
    yield put({type: JOIN_CHANNEL_FAILED, error: error.message});
    bugsnagClient.notify(error);
  }
}

export {
  leaveChannel,
  directChat,
  publishAcceptedPrayerRequest,
  joinChannel,
};
