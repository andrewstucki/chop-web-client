// @flow
import { createSelector } from 'reselect';

// Action Types
const ID = 'ui';
export const START_HEARTBEAT = 'START_HEARTBEAT';

// Flow Types
export type UIType = {
  isHeartbeatStarted: boolean,
}

type StartHeartbeatType = {
  type: typeof START_HEARTBEAT,
};

export type ActionType = StartHeartbeatType;

// Action Creators
export const startHeartbeat = (): StartHeartbeatType => ({
  type: START_HEARTBEAT,
});

// Reducer
export const defaultState = {
  isHeartbeatStarted: false,
};

export default (
  state: UIType = defaultState,
  action?: ActionType): UIType => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
    case START_HEARTBEAT:
      return {
        ...state,
        isHeartbeatStarted: true,
      };
    default:
      return state;
  }
};

// selectors
const local = state => state[ID] || state;

export const isHeartbeatStarted = createSelector(
  local,
  state => state.isHeartbeatStarted
);
