// @flow
import chatReducer from '../chat/dux';
import feedReducer from '../feed/dux';
import ioReducer from '../io/dux';
import navBarReducer from '../navBar/dux';
import videoFeedReducer from '../videoFeed/dux';
import sideMenuReducer from '../sideMenu/dux';
import momentReducer from '../moment/dux';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  chat: chatReducer,
  feed: feedReducer,
  io: ioReducer,
  navBar: navBarReducer,
  videoFeed: videoFeedReducer,
  sideMenu: sideMenuReducer,
  moment: momentReducer,
});

export default reducer;
