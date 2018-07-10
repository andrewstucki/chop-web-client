// @flow
import type {
  AnchorMomentActionType,
  AnchorMomentType,
} from './anchorMoment/dux';

import {
  SET_ANCHOR_MOMENT,
  RELEASE_ANCHOR_MOMENT,
} from './anchorMoment/dux';

// Type Definitions

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
    return {
      ...state,
      renderPlaceholder: true,
      placeholder: [
        ...state.placeholder,
        action.anchorMoment,
      ],
    };
  }
  case RELEASE_ANCHOR_MOMENT:
    return {
      ...state,
      renderPlaceholder: false,
      placeholder: [],
    };
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
  defaultState,
  getRaisedHandCount,
};

export default reducer;
