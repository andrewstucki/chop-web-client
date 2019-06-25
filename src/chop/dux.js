// @flow
import storage from 'redux-persist/lib/storage';
import feed, { defaultState as feedState, type FeedType, type FeedActionTypes } from '../feed/dux';
import schedule, { defaultState as scheduleState, type ScheduleType, type ActionType as ScheduleActionType } from '../schedule/dux';
import sequence, { defaultState as sequenceState, type SequenceType, type ActionType as SequenceActionType } from '../sequence/dux';
import subscriber, { defaultState as subscriberState, type SubscriberStateType, type SubscriberActionType } from '../subscriber/dux';
import event, { defaultState as eventState, type EventType, type ActionType as EventActionType } from '../event/dux';
import { combineReducers } from 'redux';

// Root Reducer
export const RESET_APP = 'RESET_APP';

type RootActionTypes =  ResetAppType;

type RootActionType =
  | RootActionTypes
  | FeedActionTypes
  | ScheduleActionType
  | SequenceActionType
  | SubscriberActionType
  | EventActionType;

type ResetAppType = {
  type: typeof RESET_APP,
};

export const resetApp = () => (
  {
    type: RESET_APP,
  }
);

// Combine Reducers
export type ChopStateType = {|
  feed: FeedType,
  schedule: ScheduleType,
  sequence: SequenceType,
  subscriber: SubscriberStateType,
  event: EventType,
|};

const appReducer =  combineReducers({
  feed,
  schedule,
  sequence,
  subscriber,
  event,
});

const rootReducer = (state:ChopStateType, action:RootActionType) => {
  let appState = state;
  if (action.type === RESET_APP) {
    storage.removeItem('persist:root');
    appState = undefined;
  }
  return appReducer(appState, action);
};

export default rootReducer;

export const defaultState = {
  feed: feedState,
  schedule: scheduleState,
  sequence: sequenceState,
  subscriber: subscriberState,
  event: eventState,
};
