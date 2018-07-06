// @flow
import type {
  AnchorMomentActionType,
  AnchorMomentType,
} from './anchorMoment/dux';

import { CALL_TO_CHRIST } from './anchorMoment/dux';

// Type Definitions

const SET_ANCHOR_MOMENT = 'SET_ANCHOR_MOMENT';

type PlaceholderType = {
  renderPlaceholder: boolean,
  raisedHandCount: number,
  placeholder: Array<AnchorMomentType>,
};

type PlaceholderActionType =
  | AnchorMomentActionType;

// Action Creators

// Default State

const defaultState = {
  renderPlaceholder: false,
  raisedHandCount: 0,
  placeholder: [],
};

// Reducer

const reducer = (
  state: PlaceholderType = defaultState,
  action?: PlaceholderActionType
): PlaceholderType => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
  case SET_ANCHOR_MOMENT: {
    if (!action.anchorMoment.type) {
      return state;
    }
    switch (action.anchorMoment.type) {
    case CALL_TO_CHRIST:
      return {
        ...state,
        renderPlaceholder: true,
        placeholder: [
          ...state.placeholder,
          action.anchorMoment,
        ],
      };
    }
    // KENNY I returned a copy of state here to satisfy the linter, 
    // but I'm not 100% positive it's what we need...tests are passing still
    return { ...state };
  }
  default:
    return state;
  }
};

// Selectors

const getRaisedHandCount = (state: PlaceholderType) => (
  state.raisedHandCount
);

// Exports

export type {
  PlaceholderType,
  PlaceholderActionType,
};

export {
  SET_ANCHOR_MOMENT,
};

export {
  defaultState,
  getRaisedHandCount,
};

export default reducer;
