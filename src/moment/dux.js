// flow
import type { MessageType } from './message/dux';
import type { NotificationType } from './notification/dux';
import messageReducer from './message/dux';
import { combineReducers } from 'redux';


type MomentType =
  | MessageType
  | NotificationType;

const reducer = combineReducers(
  {
    message: messageReducer,
  }
);

export default reducer;

export type {
  MomentType,
  NotificationType,
};
