// @flow
import type {PublishMuteSubscriberType} from '../../moment';
import type {Saga} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import queries from '../queries';
import {MUTE_SUBSCRIBER_FAILED, MUTE_SUBSCRIBER_SUCCEEDED} from '../../subscriber/dux';
import bugsnagClient from '../../util/bugsnag';

function* muteSubscriber (action: PublishMuteSubscriberType): Saga<void> {
  try {
    const result = yield call([queries, queries.muteSubscriber], action.channelId, action.subscriberName);
    if (result.muteSubscriber) {
      yield put({type: MUTE_SUBSCRIBER_SUCCEEDED, name: action.subscriberName});
    } else {
      yield put({type: MUTE_SUBSCRIBER_FAILED, name: action.subscriberName, error: `Server returned false for muteSubscriber: ${action.subscriberName}`});
      bugsnagClient.notify(new Error(`Server returned false for muteSubscriber: ${action.subscriberName}`));
    }
  } catch (error) {
    yield put({type: MUTE_SUBSCRIBER_FAILED, name: action.subscriberName, error: error.message});
    bugsnagClient.notify(error);
  }
}

export {
  muteSubscriber,
};
