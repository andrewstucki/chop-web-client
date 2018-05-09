// @flow
import chatReducer from '../chat/dux';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  chat: chatReducer,
});

export default reducer;
