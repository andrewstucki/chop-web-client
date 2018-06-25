// flow
import type { MessageType } from './message/dux';
import type { NotificationType } from './notification/dux';
import messageReducer from './message/dux';
import { combineReducers } from 'redux';

// Type Declarations

const PUBLISH_MOMENT_TO_CHANNEL = 'PUBLISH_MOMENT_TO_CHANNEL';

type PublishMomentToChannelType = {
  type: 'PUBLISH_MOMENT_TO_CHANNEL',
  channel: string,
  moment: MomentType,
};

type MomentType =
  | MessageType
  | NotificationType;

// Reducer

const reducer = combineReducers(
  {
    message: messageReducer,
  }
);

// Exports

export type {
  MomentType,
  NotificationType,
};

export {
  PUBLISH_MOMENT_TO_CHANNEL,
};

export default reducer;
