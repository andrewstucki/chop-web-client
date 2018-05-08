// @flow
import chatReducer from '../chat/ducks'
import { combineReducers } from 'redux';

const reducer = combineReducers({
  chat: chatReducer
});

export default reducer;
