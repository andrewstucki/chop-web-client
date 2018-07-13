// @flow
import type {
  AnchorMomentActionType,
  AnchorMomentType,
} from './anchorMoment/dux';

import type { FeedType } from '../feed/dux';

import {
  SET_ANCHOR_MOMENT,
  RELEASE_ANCHOR_MOMENT,
} from './anchorMoment/dux';

// Type Definitions

type PlaceholderType = {
  renderPlaceholder: boolean,
  placeholder: AnchorMomentType | null,
};

type PlaceholderActionType =
  | AnchorMomentActionType;

// Default State

const defaultState = {
  renderPlaceholder: false,
  placeholder: null,
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
  case SET_ANCHOR_MOMENT:
    return {
      ...state,
      renderPlaceholder: true,
      placeholder: action.anchorMoment,
    };
  case RELEASE_ANCHOR_MOMENT:
    return {
      ...state,
      renderPlaceholder: false,
      placeholder: null,
    };
  default:
    return state;
  }
};

// Selectors

const placeholderContents = (state: PlaceholderType) => (
  state.placeholder
);

const getCurrentChannel = (state: FeedType) => (
  state.currentChannel
);

const setAnchorMomentAnchored = (state: PlaceholderType) => (
  state.placeholder === null ? false : true
);

// Exports

export type {
  PlaceholderType,
  PlaceholderActionType,
};

export {
  defaultState,
  placeholderContents,
  getCurrentChannel,
  setAnchorMomentAnchored,
};

export default reducer;
