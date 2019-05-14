// @flow
import { createSelector } from 'reselect';
import { groupBy } from 'lodash';
import dayjs from 'dayjs';

// Action Types
const ID = 'schedule';
export const SCHEDULE = 'SCHEDULE';
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

// reducer

export default (
  state: ScheduleType = [],
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
const local = state => state[ID];

export const getNextEventData = createSelector(
  local,
  schedule => schedule[0]
);

export const getNextStartTime = createSelector(
  local,
  schedule => schedule[0].startTime
);

export const getScheduleGroupedByDay = createSelector(
  local,
  schedule => groupBy(schedule, item => dayjs.unix(item.startTime).day())
);
