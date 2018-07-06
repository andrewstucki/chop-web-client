// @flow

// Type Definitions

const CALL_TO_CHRIST = 'CALL_TO_CHRIST';
const SET_ANCHOR_MOMENT = 'SET_ANCHOR_MOMENT';
const ANCHOR_MOMENT = 'ANCHOR_MOMENT';

type AnchorMomentType = 
| CallToChristType;

type CallToChristType = {
  type: 'CALL_TO_CHRIST',
  text: string,
  subText: string,
  showReleaseAnchorButton: boolean,
};

type AnchorMomentStateType = {
  renderAnchorMoment: boolean,
  raisedHandCount: number,
};

type PublishCallToChristType = {
  type: 'SET_ANCHOR_MOMENT',
  channel: string,
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
    channel: 'event',
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
  renderAnchorMoment: false,
  raisedHandCount: 0,
};

// Reducer

const reducer = (
  state: AnchorMomentStateType = defaultState,
  action?: AnchorMomentActionType
): AnchorMomentStateType => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
    default:
      return state;
  }
};

// Selectors

const getRaisedHandCount = (state: AnchorMomentStateType) => (
  state.raisedHandCount
);

// Exports

export type {
  AnchorMomentType,
  AnchorMomentStateType,
  AnchorMomentActionType,
  PublishCallToChristType,
  CallToChristType,
};

export {
  CALL_TO_CHRIST,
};

export {
  defaultState,
  getRaisedHandCount,
  publishCallToChrist,
};

export default reducer;
