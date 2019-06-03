// @flow
import bugsnagClient from '../../util/bugsnag';
import type { Saga } from 'redux-saga';
import type { MomentType, PublishMomentToChannelType } from '../../moment/dux';
import type { ChannelType } from '../../feed/dux';
import Converter from '../converter';
import PubnubClient from '../pubnubClient';
import { all, put, take, select, call } from 'redux-saga/effects';
import { getChannelById } from '../../selectors/channelSelectors';
import { directChat } from './privateChat';
import { removeChannel } from '../../feed/dux';
import { DIRECT_CHAT, MESSAGE } from '../../moment';
import { PRIMARY_PANE } from '../../pane/dux';
import { setPaneToChat } from '../../pane/content/chat/dux';
import { addMomentToChannel } from '../../moment/dux';

type PubnubPublishFailedType = {
  type: typeof PUBNUB_PUBLISH_FAILED,
  error: string,
};

const PUBNUB_PUBLISH_FAILED = 'PUBNUB_PUBLISH_FAILED';

function* setPubnubClient (): Saga<boolean> {
  const [ currentSubscriber, pubnubKeys ] = yield all([
    take('SET_SUBSCRIBER'),
    take('SET_PUBNUB_KEYS'),
  ]);

  PubnubClient.config({
    publishKey: pubnubKeys.publish,
    subscribeKey: pubnubKeys.subscribe,
    authKey: currentSubscriber.subscriber.pubnubAccessKey,
    uuid: currentSubscriber.subscriber.id,
  });

  return true;
}

function* publishMomentToChannel (action: PublishMomentToChannelType): Saga<void> {
  try {
    const channel:ChannelType = yield select(getChannelById, action.channel);
    let publishChannel = action.channel;

    if (channel && channel.placeholder && action.moment.type === MESSAGE) {
      // Create the real channel
      const [ otherSubscriber ] = channel.subscribers;

      if (otherSubscriber) {
        const directChatChannel = (yield* directChat(
          {
            type: DIRECT_CHAT,
            otherSubscriberId: otherSubscriber.id,
            otherSubscriberNickname: otherSubscriber.nickname,
          },
        ));

        publishChannel = directChatChannel;

        // Remove the placeholder
        yield put(removeChannel(channel.id));

        if (publishChannel) {
          // Update the pane
          yield put(setPaneToChat(PRIMARY_PANE, publishChannel, false));

          // Add this placeholder message to the real channel
          yield put(addMomentToChannel(publishChannel, action.moment));
        }
      } else {
        throw new Error('Other subscriber was not in the channel subscribers.');
      }
    }

    if (publishChannel) {
      if (action.moment.type === 'NOTIFICATION' && action.moment.notificationType === 'PRAYER') {
        publishSystemMessage(action.moment, publishChannel);
      } else if (action.moment.type === 'NOTIFICATION' && action.moment.notificationType === 'LEFT_CHANNEL') {
        publishLeaveChannel(action.moment, publishChannel);
      } else if (action.moment.type === 'NOTIFICATION' && action.moment.notificationType === 'MUTE') {
        publishMuteSubscriber(action.moment, publishChannel);
      } else {
        publishNewMessage(action.moment, publishChannel);
      }
    }
  } catch (error) {
    yield put({type: PUBNUB_PUBLISH_FAILED, error: error.message});
  }
}

function* handlePubnubErrors (action: PubnubPublishFailedType): Saga<void> {
  yield call([bugsnagClient, bugsnagClient.notify], action.error);
}

const publishSystemMessage = (moment:MomentType, channelId: string) => (
  PubnubClient.publish(
    {
      channel: channelId,
      message: {
        action: 'systemMessage',
        channel: channelId,
        data: Converter.cwcToLegacySystemMessage(moment),
      },
    }
  )
);

const publishLeaveChannel = (moment: MomentType, channelId: string) => (
  PubnubClient.publish(
    {
      channel: channelId,
      message: {
        action: 'newMessage',
        channel: channelId,
        data: Converter.cwcToLegacyLeaveChannel(moment, channelId),
      },
    }
  )
);

const publishMuteSubscriber = (moment: MomentType, channelId: string) => (
  PubnubClient.publish(
    {
      channel: channelId,
      message: {
        action: 'muteSubscriber',
        channel: channelId,
        data: Converter.cwcToLegacyMuteSubscriber(moment),
      },
    }
  )
);

const publishNewMessage = (moment:MomentType, channelId: string) => (
  PubnubClient.publish(
    {
      channel: channelId,
      message: {
        action: 'newMessage',
        channel: channelId,
        data: Converter.cwcMessageToLegacyNewMessage(moment, channelId),
      },
    }
  )
);

export { PUBNUB_PUBLISH_FAILED, publishMomentToChannel, setPubnubClient, handlePubnubErrors };
