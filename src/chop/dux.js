// @flow

import feed, { defaultState as feedState, type FeedType } from '../feed/dux';
import schedule, { defaultState as scheduleState, type ScheduleType } from '../schedule/dux';
import sequence, { defaultState as sequenceState, type SequenceType } from '../sequence/dux';
import subscriber, { defaultState as subscriberState, type SubscriberStateType } from '../subscriber/dux';

import { combineReducers } from 'redux';

export default combineReducers({
  feed,
  schedule,
  sequence,
  subscriber,
});

export type ChopStateType = {|
  feed: FeedType,
  schedule: ScheduleType,
  sequence: SequenceType,
  subscriber: SubscriberStateType,
|};

export const defaultState = {
  feed: feedState,
  schedule: scheduleState,
  sequence: sequenceState,
  subscriber: subscriberState,
};
