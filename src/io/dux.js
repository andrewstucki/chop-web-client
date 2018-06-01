// @flow
import ioChatReducer from './chat/dux';
import sessionReducer from './session/dux';
import domReducer from './dom/dux';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  ioChat: ioChatReducer,
  session: sessionReducer,
  dom: domReducer,
});

export default reducer;
