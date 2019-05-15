// @flow
import feed, { defaultState as feedState } from '../feed/dux';
import type { FeedType } from '../feed/dux';
import schedule, { defaultState as scheduleState } from '../schedule/dux';
import  type { ScheduleType } from '../schedule/dux';
import sequence, { defaultState as sequenceState } from '../sequence/dux';
import type { SequenceType } from '../sequence/dux';
import user, { defaultState as userState } from '../users/dux';
import type { UserStateType } from '../users/dux';
import { combineReducers } from 'redux';

export default combineReducers({
  feed,
  schedule,
  sequence,
  user,
});

export type ChopStateType = {|
  feed: FeedType,
  schedule: ScheduleType,
  sequence: SequenceType,
  user: UserStateType,
|};

export const defaultState = {
  feed: feedState,
  schedule: scheduleState,
  sequence: sequenceState,
  user: userState,
};
