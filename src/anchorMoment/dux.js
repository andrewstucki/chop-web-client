// @flow
import { createUid } from '../util';

import type { ChopStateType } from '../chop/dux';

// Action Types

const ANCHOR_MOMENT = 'ANCHOR_MOMENT';
const SET_ANCHOR_MOMENT = 'SET_ANCHOR_MOMENT';
const RELEASE_ANCHOR_MOMENT = 'RELEASE_ANCHOR_MOMENT';
const SALVATION = 'SALVATION';

// Flow Type Definitions

type SalvationType = {
  type: 'ANCHOR_MOMENT',
  anchorMomentType: 'SALVATION',
  id: string,
};

type PublishSalvationType = {
  type: 'SET_ANCHOR_MOMENT',
  anchorMoment: SalvationType,
  channel: string,
}

type ReleaseAnchorMomentType = {
  type: 'RELEASE_ANCHOR_MOMENT',
  id: string,
  channel: string,
};

type AnchorMomentType =
  | SalvationType;

type AnchorMomentActionType =
  | PublishSalvationType
  | ReleaseAnchorMomentType;

// Action Creators

const releaseAnchorMoment = (channel:string, id:string): ReleaseAnchorMomentType => (
  {
    type: RELEASE_ANCHOR_MOMENT,
    channel,
    id,
  }
);

const publishSalvation = (channel:string): PublishSalvationType => (
  {
    type: SET_ANCHOR_MOMENT,
    channel,
    anchorMoment: {
      type: ANCHOR_MOMENT,
      anchorMomentType: SALVATION,
      id: createUid(),
    },
  }
);

// Selectors
const local = state => state.feed || state;

const salvationMomentExists = (state:ChopStateType, eventChannel:string): boolean => {
  if (local(state).channels[eventChannel].moments.find(moment => moment.anchorMomentType === SALVATION)
      || local(state).channels[eventChannel].anchorMoments.find(anchorMoment => anchorMoment.anchorMomentType === SALVATION)) {
    return true;
  }
  return false;
};

// Exports

export type {
  AnchorMomentType,
  AnchorMomentActionType,
  ReleaseAnchorMomentType,
  SalvationType,
  PublishSalvationType,
};

export {
  ANCHOR_MOMENT,
  SET_ANCHOR_MOMENT,
  RELEASE_ANCHOR_MOMENT,
  SALVATION,
};

export {
  releaseAnchorMoment,
  publishSalvation,
  salvationMomentExists,
};
