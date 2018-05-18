// @flow
import chatReducer from '../chat/dux';
import feedReducer from '../feed/dux';
import ioReducer from '../io/chat';
import navBarReducer from '../navBar/dux';
import videoFeedReducer from '../videoFeed/dux';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  chat: chatReducer,
  feed: feedReducer,
  io: ioReducer,
  navBar: navBarReducer,
  videoFeed: videoFeedReducer,
});

export default reducer;
