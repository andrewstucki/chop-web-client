import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from 'redux';
import { reducer } from './reducer';

const store = createStore(reducer);

const greeting = (name: string): string =>
  `Hello ${name}!`;

store.subscribe(() =>
ReactDOM.render((
    <h1>{greeting(store.getState().name)}</h1>
  ), document.body)
);


