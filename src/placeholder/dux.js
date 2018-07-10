// @flow
import type {
  AnchorMomentActionType,
  AnchorMomentType,
} from './anchorMoment/dux';

import {
  SET_ANCHOR_MOMENT,
  RELEASE_ANCHOR_MOMENT,
  ANCHOR_MOMENT,
} from './anchorMoment/dux';

// Type Definitions

type PlaceholderType = {
  renderPlaceholder: boolean,
  placeholder: AnchorMomentType,
};

type PlaceholderActionType =
  | AnchorMomentActionType;

// Action Creators

// Default State

const defaultState = {
  renderPlaceholder: false,
  placeholder: {
    type: ANCHOR_MOMENT,
    id: '',
    text: '',
    subText: '',
    showReleaseAnchorButton: true,
  },
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
      placeholder: action.anchorMoment,
    };
  }
  case RELEASE_ANCHOR_MOMENT:
    return {
      ...state,
      renderPlaceholder: false,
      placeholder: {
        type: ANCHOR_MOMENT,
        id: '',
        text: '',
        subText: '',
        showReleaseAnchorButton: true,
      },
    };
  default:
    return state;
  }
};

// Selectors

const placeholderContents = (state: PlaceholderType) => (
  state.placeholder
);

// Exports

export type {
  PlaceholderType,
  PlaceholderActionType,
};

export {
  defaultState,
  placeholderContents,
};

export default reducer;
