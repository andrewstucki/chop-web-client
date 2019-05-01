// @flow
import feed from '../feed/dux';
import schedule from '../schedule/dux';
import sequence from '../sequence/dux';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  feed,
  schedule,
  sequence,
});

export default reducer;
