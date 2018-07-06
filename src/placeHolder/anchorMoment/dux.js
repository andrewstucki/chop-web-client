// @flow
import { SET_ANCHOR_MOMENT } from '../dux';

// Type Definitions

const CALL_TO_CHRIST = 'CALL_TO_CHRIST';
const RELEASE_ANCHOR_MOMENT = 'RELEASE_ANCHOR_MOMENT';

type CallToChristType = {
  type: 'CALL_TO_CHRIST',
  text: string,
  subText: string,
  showReleaseAnchorButton: boolean,
};

type PublishCallToChristType = {
  type: 'SET_ANCHOR_MOMENT',
  anchorMoment: AnchorMomentType,
};

type ReleaseAnchorMomentType = {
  type: 'RELEASE_ANCHOR_MOMENT',
};

type AnchorMomentType = 
| CallToChristType;

type AnchorMomentActionType =
  | PublishCallToChristType
  | ReleaseAnchorMomentType;

// Action Creators

const releaseAnchorMoment = () => (
  {}
);

const publishCallToChrist = (subText: string) => (
  {
    type: SET_ANCHOR_MOMENT,
    anchorMoment: {
      type: CALL_TO_CHRIST,
      text: 'Would you like to give your life to Christ?',
      subText,
      showReleaseAnchorButton: true,
    },
  }
);

// Exports

export type {
  AnchorMomentType,
  AnchorMomentActionType,
  CallToChristType,
};

export {
  CALL_TO_CHRIST,
  RELEASE_ANCHOR_MOMENT,
};

export {
  publishCallToChrist,
  releaseAnchorMoment,
};
