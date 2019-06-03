// @flow
import type { LeaveChannelType, JoinChannelType } from '../../feed/dux';
import type { Saga } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import queries from '../queries';
import type { GraphQLParticipantsType } from '../queries';
import { addChannel, LEAVE_CHANNEL_FAILED, LEAVE_CHANNEL_SUCCEEDED, JOIN_CHANNEL_FAILED } from '../../feed/dux';
import bugsnagClient from '../../util/bugsnag';
import type { PublishAcceptedPrayerRequestType, PublishDirectChatType } from '../../moment';
import { setPrimaryPane } from '../../pane/dux';
import { CHAT } from '../../pane/content/chat/dux';
import { DIRECT_CHAT_FAILED, PUBLISH_ACCEPTED_PRAYER_REQUEST_FAILED } from '../../moment';
import type { SharedSubscriberType } from '../../subscriber/dux';

export const convertSubscriber = (subscriber: GraphQLParticipantsType):SharedSubscriberType => {
  if (subscriber.nickname === null) {
    bugsnagClient.notify(new Error(`Subscriber has null name {id: ${subscriber.id}.`));
  }
  return {
    id: subscriber.id || '',
    nickname: subscriber.nickname || 'Guest',
    avatar: subscriber.avatar,
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
    const result = yield call([queries, queries.directChat], action.otherSubscriberId, action.otherSubscriberNickname);
    const { name, id, direct, type, subscribers } = result.createDirectChannel;
    yield put(addChannel(name, id, type, direct, subscribers.map(convertSubscriber)));
    yield put(setPrimaryPane(CHAT, id));
    return id;
  } catch (error) {
    yield put({type: DIRECT_CHAT_FAILED, error: error.message});
    bugsnagClient.notify(error);
  }
}

function* publishAcceptedPrayerRequest (action: PublishAcceptedPrayerRequestType): Saga<void> {
  try {
    const { subscriberRequestingPrayer: { id, nickname }, prayerChannel } = action;

    const result = yield call([queries, queries.acceptPrayer], prayerChannel, id, nickname);
    const { name: channelName, id: channelId, direct, type, subscribers } = result.acceptPrayer;
    yield put(addChannel(channelName, channelId, type, direct, subscribers.map(convertSubscriber)));
    yield put(setPrimaryPane(CHAT, channelId));
  } catch (error) {
    yield put({type: PUBLISH_ACCEPTED_PRAYER_REQUEST_FAILED, error: error.message});
    bugsnagClient.notify(error);
  }
}

function* joinChannel (action: JoinChannelType): Saga<void> {
  try {
    const { channel, requesterId, requesterNickname } = action;
    const result = yield call([queries, queries.joinChannel], channel, requesterId, requesterNickname);
    const { name: channelName, id, direct, type, subscribers } = result.joinFeed;
    yield put(addChannel(channelName, id, type, direct, subscribers.map(convertSubscriber)));
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
