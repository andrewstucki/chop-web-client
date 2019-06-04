// @flow
import { createSelector } from 'reselect';

// Action Types
const ID = 'event';
export const SET_EVENT = 'SET_EVENT';
export const UPDATE_EVENT_NOTES = 'UPDATE_EVENT_NOTES';
export const QUERY_CURRENT_EVENT = 'QUERY_CURRENT_EVENT';
export const QUERY_CURRENT_EVENT_FAILED = 'QUERY_CURRENT_EVENT_FAILED';

// Flow Types
type EnabledFeaturesType = {
  chat:boolean,
};

export type EventType = {
  title: string,
  id: string,
  eventTimeId: string,
  startTime: number,
  endTime: number,
  description?: string,
  hostInfo?: string,
  speaker?: string,
  hostInfo?: string,
  enabledFeatures: EnabledFeaturesType,
  eventNotes: string,
};

type SetEventType = {
  type: 'SET_EVENT',
  event: EventType,
};

type QueryCurrentEventType = {
  type: typeof QUERY_CURRENT_EVENT,
};

type UpdateEventNotesType = {
  type: typeof UPDATE_EVENT_NOTES,
  eventNotes: string,
};

type ActionType =
  | SetEventType
  | UpdateEventNotesType;


// Action Creators

export const queryCurrentEvent = (): QueryCurrentEventType => (
  {
    type: QUERY_CURRENT_EVENT,
  }
);

export const setEvent = (title: string, id: string, eventTimeId: string, startTime: number, endTime: number, videoStartTime: number,
  speaker: string, description: string, hostInfo: string, enabledFeatures: EnabledFeaturesType, eventNotes: string): SetEventType => (
  {
    type: SET_EVENT,
    event: {
      title,
      id,
      eventTimeId,
      startTime,
      endTime,
      videoStartTime,
      speaker,
      description,
      hostInfo,
      enabledFeatures,
      eventNotes,
    },
  }
);

export const updateEventNotes = (eventNotes:string):UpdateEventNotesType => (
  {
    type: UPDATE_EVENT_NOTES,
    eventNotes,
  }
);

// Reducer
export const defaultState = {
  id: '',
  eventTimeId: '',
  startTime: 0,
  endTime: 0,
  title: '',
  hostInfo: '',
  enabledFeatures: {
    chat: false,
  },
  eventNotes: '',
};

export default (
  state: EventType = defaultState,
  action?: ActionType,
): EventType => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
    case SET_EVENT:
      return action.event;
    case UPDATE_EVENT_NOTES:
      return {
        ...state,
        eventNotes: action.eventNotes,
      };
  }
  return state;
};

// Selectors
const local = state => state[ID];

const currentEventExists = createSelector(
  local,
  event => !!event?.id
);

export const isOffline = createSelector(
  currentEventExists,
  result => result === false
);

const currentEventEnabledFeatures = createSelector(
  local,
  event => event?.enabledFeatures,
);

export const isChatEnabled = createSelector(
  currentEventEnabledFeatures,
  result => result && result.chat === true
);
