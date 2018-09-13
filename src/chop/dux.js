// @flow
import feedReducer from '../feed/dux';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  feed: feedReducer,
});

export default reducer;
