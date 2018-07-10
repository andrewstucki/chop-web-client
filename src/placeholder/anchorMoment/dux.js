// @flow
import { createUid } from '../../chat/dux';

// Type Definitions

const ANCHOR_MOMENT = 'ANCHOR_MOMENT';
const SALVATION = 'SALVATION';
const SET_ANCHOR_MOMENT = 'SET_ANCHOR_MOMENT';
const RELEASE_ANCHOR_MOMENT = 'RELEASE_ANCHOR_MOMENT';

type SalvationType = {
  type: 'ANCHOR_MOMENT',
  id: string,
  text: string,
  subText: string,
  showReleaseAnchorButton: boolean,
};

type PublishSalvationType = {
  type: 'SET_ANCHOR_MOMENT',
  anchorMoment: AnchorMomentType,
};

type ReleaseAnchorMomentType = {
  type: 'RELEASE_ANCHOR_MOMENT',
  channel: string,
};

type AnchorMomentType = 
| SalvationType;

type AnchorMomentActionType =
  | PublishSalvationType
  | ReleaseAnchorMomentType;

// Action Creators

const releaseAnchorMoment = () => (
  {
    type: RELEASE_ANCHOR_MOMENT,
    channel: 'host',
  }
);

const publishSalvation = (number: number) => (
  {
    type: SET_ANCHOR_MOMENT,
    anchorMoment: {
      type: ANCHOR_MOMENT,
      id: createUid(),
      text: 'Would you like to give your life to Christ?',
      subText: number === 1 ? `${number} hand raised` : `${number} hands raised`,
      showReleaseAnchorButton: true,
    },
  }
);

// Exports

export type {
  AnchorMomentType,
  AnchorMomentActionType,
  SalvationType,
  ReleaseAnchorMomentType,
};

export {
  ANCHOR_MOMENT,
  SALVATION,
  SET_ANCHOR_MOMENT,
  RELEASE_ANCHOR_MOMENT,
};

export {
  publishSalvation,
  releaseAnchorMoment,
};
