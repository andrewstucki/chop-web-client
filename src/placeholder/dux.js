// @flow
import type {
  AnchorMomentActionType,
  AnchorMomentType,
} from './anchorMoment/dux';

import type { FeedType } from '../feed/dux';

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
    anchorMomentAnchored: true,
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
        anchorMomentAnchored: true,
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

const getCurrentChannel = (state: FeedType) => (
  state.currentChannel
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
};

export default reducer;
