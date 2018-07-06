// @flow

// Type Definitions

const CALL_TO_CHRIST = 'CALL_TO_CHRIST';
const SET_ANCHOR_MOMENT = 'SET_ANCHOR_MOMENT';

type AnchorMomentType = 
| CallToChristType;

type CallToChristType = {
  type: 'CALL_TO_CHRIST',
  text: string,
  subText: string,
  action: () => void,
  showReleaseAnchorButton: boolean,
};

type PlaceHolderType = {
  renderPlaceHolder: boolean,
  raisedHandCount: number,
};

type PublishCallToChristType = {
  type: 'SET_ANCHOR_MOMENT',
  moment: AnchorMomentType,
};

type AnchorMomentActionType =
  | PublishCallToChristType;

// Action Creators

const publishCallToChrist = (
  text: string,
  subText: string,
  showReleaseAnchorButton: boolean
) => (
  {
    type: SET_ANCHOR_MOMENT,
    moment: {
      type: CALL_TO_CHRIST,
      text,
      subText,
      showReleaseAnchorButton,
    },
  }
);

// Default State

const defaultState = {
  renderPlaceHolder: false,
  raisedHandCount: 0,
};

// Reducer

const reducer = (
  state: PlaceHolderType = defaultState,
  action?: AnchorMomentActionType
): PlaceHolderType => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
    default:
      return state;
  }
};

// Selectors

const getRaisedHandCount = (state: PlaceHolderType) => (
  state.raisedHandCount
);

// Exports

export type {
  AnchorMomentType,
  PlaceHolderType,
  AnchorMomentActionType,
  PublishCallToChristType,
  CallToChristType,
};

export {
  SET_ANCHOR_MOMENT,
  CALL_TO_CHRIST,
};

export {
  defaultState,
  getRaisedHandCount,
  publishCallToChrist,
};

export default reducer;
