// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Chop from './chop';
import reducer from './chop/dux';
import actorMiddleware from './middleware/actor-middleware';
import SequenceActor from './io/sequence';
import ChatActor from './io/chat/chat2';
import GraphQlActor from './io/graph';

const actorMiddlewareApplied = actorMiddleware(
  SequenceActor,
  ChatActor,
  GraphQlActor,
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(actorMiddlewareApplied)
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

if (document.body) {
  document.body.addEventListener('touchstart', (event: Event) => {
    const targetElement = event.target;
    if (
      !(targetElement instanceof HTMLInputElement ||
      targetElement instanceof HTMLAnchorElement ||
      targetElement instanceof HTMLButtonElement)
    ) {
      if (document.activeElement) {
        document.activeElement.blur();
      }
    }
  });
}
