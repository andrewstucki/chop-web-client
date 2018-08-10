// @flow
import feedReducer from '../feed/dux';
import ioReducer from '../io/dux';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  feed: feedReducer,
  io: ioReducer,
});

export default reducer;
