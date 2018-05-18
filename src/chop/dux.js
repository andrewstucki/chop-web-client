// @flow
import chatReducer from '../chat/dux';
import feedReducer from '../feed/dux';
import navBarReducer from '../navBar/dux';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  chat: chatReducer,
  feed: feedReducer,
  navBar: navBarReducer,
});

export default reducer;
