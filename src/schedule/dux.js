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
export const QUERY_CURRENT_EVENT_SUCCEEDED = 'QUERY_CURRENT_EVENT_SUCCEEDED';
export const SET_SCHEDULE_TIMEZONE = 'SET_SCHEDULE_TIMEZONE';

// FLow Types

export type EventScheduleType = {
  id: string,
  startTime: number,
  endTime: number,
  title: string,
  fetchTime: number,
  scheduleTime: number,
  hostInfo: string,
};

export type ScheduleType = {
  items: Array<EventScheduleType>,
  timeZone: string,
};

type PopScheduleType = {
  type: typeof POP_SCHEDULE,
  now: number,
};

type SetScheduleType = {
  type: typeof SET_SCHEDULE,
  schedule: Array<EventScheduleType>,
};

type SetScheduleTimeZoneType = {
  type: typeof SET_SCHEDULE_TIMEZONE,
  timeZone: string,
};

export type ActionType =
  | SetScheduleType
  | PopScheduleType
  | SetScheduleTimeZoneType;

// Action Creators

export const setSchedule = (schedule: Array<EventScheduleType>): SetScheduleType => (
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

export const setScheduleTimeZone = (timeZone: string):SetScheduleTimeZoneType => (
  {
    type: SET_SCHEDULE_TIMEZONE,
    timeZone,
  }
);

// reducer
export const defaultState = {
  items: [],
  timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
};

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
      return {
        ...state,
        items: action.schedule,
      };
    case POP_SCHEDULE: {
      const { now } = action;
      return {
        ...state,
        items: state.items.filter(time => (time.startTime * 1000) > now),
      };
    }
    case SET_SCHEDULE_TIMEZONE:
      return {
        ...state,
        timeZone: action.timeZone,
      };
  }
  return state;
};

// selectors
const local = state => state[ID] || state;

export const getNextEventData = createSelector(
  local,
  schedule => schedule.items?.[0] || {}
);

export const getNextStartTime = createSelector(
  local,
  schedule => schedule.items?.[0]?.startTime || 0
);

export const getScheduleGroupedByDay = createSelector(
  local,
  // $FlowFixMe
  schedule => groupBy(schedule.items, item => dayjs.unix(item.startTime).format('YYYYMMDD'))
);

export const getScheduleTimeZone = createSelector(
  local,
  schedule => schedule.timeZone,
);
