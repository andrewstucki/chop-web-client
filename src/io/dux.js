// @flow
import chatReducer from './chat';
import sessionReducer from './session/dux';
import domReducer from './dom/dux';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  chat: chatReducer,
  session: sessionReducer,
  dom: domReducer,
});

export default reducer;
