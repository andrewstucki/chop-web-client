// flow
import type { MessageType } from './message/dux';
import type { NotificationType } from './notification/dux';
import type { ActionableNotificationType } from './actionableNotification/dux';
import type { TextType } from './text/dux';
import messageReducer from './message/dux';
import { combineReducers } from 'redux';

// Type Declarations

const PUBLISH_MOMENT_TO_CHANNEL = 'PUBLISH_MOMENT_TO_CHANNEL';

type MomentType =
  | MessageType
  | NotificationType
  | ActionableNotificationType
  | TextType;

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
