// @flow

import feed, { defaultState as feedState, type FeedType } from '../feed/dux';
import schedule, { defaultState as scheduleState, type ScheduleType } from '../schedule/dux';
import sequence, { defaultState as sequenceState, type SequenceType } from '../sequence/dux';
import subscriber, { defaultState as subscriberState, type SubscriberStateType } from '../subscriber/dux';
import event, { defaultState as eventState, type EventType } from '../event/dux';

import { combineReducers } from 'redux';

export default combineReducers({
  feed,
  schedule,
  sequence,
  subscriber,
  event,
});

export type ChopStateType = {|
  feed: FeedType,
  schedule: ScheduleType,
  sequence: SequenceType,
  subscriber: SubscriberStateType,
  event: EventType,
|};

export const defaultState = {
  feed: feedState,
  schedule: scheduleState,
  sequence: sequenceState,
  subscriber: subscriberState,
  event: eventState,
};
