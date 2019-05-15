// @flow
import { createSelector } from 'reselect';

// Action Types
const ID = 'schedule';
export const POP_SCHEDULE = 'POP_SCHEDULE';
export const SET_SCHEDULE = 'SET_SCHEDULE';
export const QUERY_SCHEDULE_FAILED = 'QUERY_SCHEDULE_FAILED';

// FLow Types

type EventScheduleType = {
  id: string,
  startTime: number,
  endTime: number,
  title: string,
  fetchTime: number,
  scheduleTime: number,
  hostInfo: string,
};

export type ScheduleType = Array<EventScheduleType>;

type PopScheduleType = {
  type: typeof POP_SCHEDULE,
  now: number,
};

type SetScheduleType = {
  type: typeof SET_SCHEDULE,
  schedule: ScheduleType,
};

type ActionType =
  | SetScheduleType
  | PopScheduleType;

// Action Creators

export const setSchedule = (schedule: ScheduleType): SetScheduleType => (
  {
    type: SET_SCHEDULE,
    schedule,
  }
);

export const popSchedule = (now: number): PopScheduleType => (
  {
    type: POP_SCHEDULE,
    now,
  }
);

// default state
export const defaultState = [];

// reducer
export default (
  state: ScheduleType = defaultState,
  action?: ActionType,
): ScheduleType => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
    case SET_SCHEDULE:
      return action.schedule;
    case POP_SCHEDULE: {
      const { now } = action;
      return state.filter(time => (time.startTime * 1000) > now);
    }
  }
  return state;
};

// selectors
const local = state => state[ID] || state;

export const getNextEventData = createSelector(
  local,
  schedule => schedule[0]
);

export const getNextStartTime = createSelector(
  local,
  schedule => schedule[0].startTime
);
