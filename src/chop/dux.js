// @flow
import feedReducer from '../feed/dux';
import ioReducer from '../io/dux';
import sideMenuReducer from '../sideMenu/dux';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  feed: feedReducer,
  io: ioReducer,
  sideMenu: sideMenuReducer,
});

export default reducer;
