// @flow
import feedReducer from '../feed/dux';
import { combineReducers } from 'redux';

const cacheReducer = (state, action) => {
  return {
    ...state,
    lastAction: action.type,
  }
}

const reducer = combineReducers({
  feed: feedReducer,
  cache: cacheReducer,
});

export default reducer;
