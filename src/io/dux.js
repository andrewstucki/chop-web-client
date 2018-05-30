// @flow
import ioChatReducer from './chat/dux';
import sessionReducer from './session/dux';
import { combineReducers } from 'redux';

const reducer = combineReducers({
  ioChat: ioChatReducer,
  session: sessionReducer,
});

export default reducer;
