// flow
import type { MessageType } from './message/dux';
import messageReducer from './message/dux';
import { combineReducers } from 'redux';


type MomentType =
  | MessageType;

const reducer = combineReducers(
  {
    message: messageReducer,
  }
);

export default reducer;

export type {
  MomentType,
};