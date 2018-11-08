// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Chop from './chop';
import reducer from './chop/dux';
import actorMiddleware from './middleware/actor-middleware';
import ChatActor from './io/chat';
import serviceActor from './io/serviceActor';
import tagManagerMiddleware from './middleware/tagmanager-middleware';
import bugsnag from 'bugsnag-js';
import createPlugin from 'bugsnag-react';

declare var ENV:string;
const bugsnagClient = bugsnag({
  apiKey: '2403ac729529750d296e1e4ee022f7dc',
  releaseStage: ENV,
  notifyReleaseStages: [ 'production', 'staging' ],
});

const ErrorBoundary = bugsnagClient.use(createPlugin(React));

const actorMiddlewareApplied = actorMiddleware(
  ChatActor,
  serviceActor,
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
      <ErrorBoundary>
        <Chop />
      </ErrorBoundary>
    </Provider>,
    content);
}

if (document.body) {
  window.addEventListener('orientationchange', () => {
    if (document.activeElement) {
      document.activeElement.blur();
    }
    window.scrollTo({top:0, behavior:'instant'});
  });
}
