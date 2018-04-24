// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Chop from './chop';
import chopReducer from './chop-reducer';
import thunk from 'redux-thunk';

const store = createStore(
  chopReducer,
  applyMiddleware(thunk)
);
const content = document.getElementById('content');

if (content) {
  ReactDOM.render(
    <Provider store={store}>
      <Chop />
    </Provider>,
    content);
}


