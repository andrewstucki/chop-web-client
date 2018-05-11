// @flow
import chatReducer from '../chat/dux';
import feedReducer from '../feed/dux';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  chat: chatReducer,
  feed: feedReducer,
});

export default reducer;
