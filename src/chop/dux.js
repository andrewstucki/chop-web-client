// @flow
import feedReducer from '../feed/dux';
import ioReducer from '../io/dux';
import videoFeedReducer from '../videoFeed/dux';
import sideMenuReducer from '../sideMenu/dux';
import placeholderReducer from '../placeholder/dux';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  feed: feedReducer,
  io: ioReducer,
  videoFeed: videoFeedReducer,
  sideMenu: sideMenuReducer,
  placeholder: placeholderReducer,
});

export default reducer;
