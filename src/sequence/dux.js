// @flow
import type { GraphQLEventAtTimeType } from '../io/queries';
import { createSelector } from 'reselect';

// Action Types
const ID = 'sequence';
const SET_SEQUENCE = 'SET_SEQUENCE';
const SET_STEP_DATA = 'SEQUENCE_SET_DATA';
const POP_STEP = 'POP_STEP';

// Flow Types
export type SequenceType = {
  serverTime: number,
  steps: Array<SequenceStepType>,
};

type SequenceStepType = {
  fetchTime: number,
  transitionTime: number,
  data?: GraphQLEventAtTimeType,
  queries: Array<string>,
};

type SetSequenceType = {
  type: typeof SET_SEQUENCE,
  sequence: SequenceType,
};

type PopStepType = {
  type: typeof POP_STEP,
};

export type ActionType = SetSequenceType | PopStepType;

// Action Creators
export const setSequence = (sequence: SequenceType): SetSequenceType => ({
  type: SET_SEQUENCE,
  sequence,
});

export const popStep = (): PopStepType => (
  {
    type: POP_STEP,
  }
);

export const setStepData = (data: GraphQLEventAtTimeType) => ({
  type: SET_STEP_DATA,
  data,
});

// default
export const defaultState: SequenceType = {
  serverTime: 0,
  steps: [],
};

// reducer
export default (
  state: SequenceType = defaultState,
  action?: ActionType
): SequenceType => {
  if (action && action.type) {
    switch (action.type) {
      case SET_SEQUENCE:
        return action.sequence;
      case POP_STEP:
        return {
          ...state,
          steps: state.steps.slice(1),
        };
      case SET_STEP_DATA:
        return {
          ...state,
          steps: [
            {
              ...state.steps[0],
              data: action.data,
            },
            ...state.steps.slice(1),
          ],
        };
    }
  }
  return state;
};

// selectors
const local = state => state[ID] || state;

const getSteps = state => local(state).steps;

const serverTime = state => local(state).serverTime;

export const getNextStep = createSelector(
  [getSteps],
  steps => steps && steps[0]
);

export const getNextFetchTime = createSelector(
  getSteps,
  steps => (steps && steps[0] ? steps[0].fetchTime : 0)
);

export const getNextTransitionTime = createSelector(
  getSteps,
  steps => (steps && steps[0] ? steps[0].transitionTime : 0)
);

export const hasSequence = createSelector(
  getSteps,
  steps => steps.length > 0
);

export const getServerTime = createSelector(
  serverTime,
  time => time
);

export const getNextData = createSelector(
  getNextStep,
  step => step.data
);
