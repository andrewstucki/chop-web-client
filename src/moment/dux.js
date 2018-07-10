// flow
import { combineReducers } from 'redux';

import type { MessageType } from './message/dux';
import type { NotificationType } from './notification/dux';
import type { AnchorMomentType } from '../placeholder/anchorMoment/dux';
import type { ActionableNotificationType } from './actionableNotification/dux';

import messageReducer from './message/dux';

// Type Declarations

const PUBLISH_MOMENT_TO_CHANNEL = 'PUBLISH_MOMENT_TO_CHANNEL';

type MomentType =
  | MessageType
  | NotificationType
  | ActionableNotificationType
  | AnchorMomentType;

// Reducer

const reducer = combineReducers(
  {
    message: messageReducer,
  }
);

// Exports

export type {
  MomentType,
};

export {
  PUBLISH_MOMENT_TO_CHANNEL,
};

export default reducer;
