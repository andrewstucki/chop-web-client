// @flow
import { createUid } from '../../util';

// Type Definitions

const ANCHOR_MOMENT = 'ANCHOR_MOMENT';
const SALVATION = 'SALVATION';
const SET_ANCHOR_MOMENT = 'SET_ANCHOR_MOMENT';
const RELEASE_ANCHOR_MOMENT = 'RELEASE_ANCHOR_MOMENT';

type PublishSalvationType = {
  type: 'SET_ANCHOR_MOMENT',
  anchorMoment: AnchorMomentType,
};

type ReleaseAnchorMomentType = {
  type: 'RELEASE_ANCHOR_MOMENT',
  channel: string,
};

type AnchorMomentType = {
  type: 'ANCHOR_MOMENT',
  id: string,
  text: string,
  subText: string,
};

type AnchorMomentActionType =
  | PublishSalvationType
  | ReleaseAnchorMomentType;

// Action Creators

const releaseAnchorMoment = (): ReleaseAnchorMomentType => (
  {
    type: RELEASE_ANCHOR_MOMENT,
    channel: 'host',
  }
);

const publishSalvation = (number: number): PublishSalvationType => (
  {
    type: SET_ANCHOR_MOMENT,
    anchorMoment: {
      type: ANCHOR_MOMENT,
      id: createUid(),
      text: 'I commit my life to Christ.',
      subText: number === 1 ? `${number} hand raised` : `${number} hands raised`,
    },
  }
);

// Exports

export type {
  AnchorMomentType,
  AnchorMomentActionType,
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
