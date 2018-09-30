// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Chop from './chop';
import reducer from './chop/dux';
import actorMiddleware from './middleware/actor-middleware';
import SequenceActor from './io/sequence';
import ChatActor from './io/chat';
import GraphQlActor from './io/graph';
import tagManagerMiddleware from './middleware/tagmanager-middleware';

const actorMiddlewareApplied = actorMiddleware(
  SequenceActor,
  ChatActor,
  GraphQlActor,
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewareList = [actorMiddlewareApplied, tagManagerMiddleware];
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(...middlewareList)
  )
);

store.dispatch({ type: 'INIT' });

const content = document.getElementById('content');

if (content) {
  ReactDOM.render(
    <Provider store={store}>
      <Chop />
    </Provider>,
    content);
}
