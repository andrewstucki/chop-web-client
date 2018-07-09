// @flow
import { SET_ANCHOR_MOMENT } from '../dux';
import { createUid } from '../../chat/dux';

// Type Definitions

const ANCHOR_MOMENT = 'ANCHOR_MOMENT';
const CALL_TO_CHRIST = 'CALL_TO_CHRIST';
const RELEASE_ANCHOR_MOMENT = 'RELEASE_ANCHOR_MOMENT';

type CallToChristType = {
  type: 'ANCHOR_MOMENT',
  anchorMomentType: 'CALL_TO_CHRIST',
  id: string,
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
  channel: string,
  anchorMoment: AnchorMomentType,
};

type AnchorMomentType = 
| CallToChristType;

type AnchorMomentActionType =
  | PublishCallToChristType
  | ReleaseAnchorMomentType;

// Action Creators

const releaseAnchorMoment = (anchorMoment: AnchorMomentType) => (
  {
    type: RELEASE_ANCHOR_MOMENT,
    channel: 'public',
    anchorMoment,
  }
);

const publishCallToChrist = (subText: string) => (
  {
    type: SET_ANCHOR_MOMENT,
    anchorMoment: {
      type: ANCHOR_MOMENT,
      anchorMomentType: CALL_TO_CHRIST,
      id: createUid(),
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
  ReleaseAnchorMomentType,
};

export {
  ANCHOR_MOMENT,
  CALL_TO_CHRIST,
  RELEASE_ANCHOR_MOMENT,
};

export {
  publishCallToChrist,
  releaseAnchorMoment,
};
