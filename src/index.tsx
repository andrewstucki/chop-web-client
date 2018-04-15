import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import chopReducer from './chop-reducer';
import Chop from './chop';

const store = createStore(chopReducer);

store.subscribe(() =>
ReactDOM.render(
  <Provider store={store}>
    <Chop />
  </Provider>,
  document.getElementById('content'))
);


