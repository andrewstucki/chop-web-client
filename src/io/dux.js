// @flow
import ioChatReducer from './chat/dux';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  ioChat: ioChatReducer,
});

export default reducer;
