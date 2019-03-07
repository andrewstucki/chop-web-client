// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { createWhitelistFilter } from 'redux-persist-transform-filter';
import createExpirationTransform from 'redux-persist-transform-expire';
import { defaultState } from './feed/dux';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Chop from './chop';
import Login from './login';
import reducer from './chop/dux';
import actorMiddleware from './middleware/actor-middleware';
import ChatActor from './io/chat';
import serviceActor from './io/serviceActor';
import tagManagerMiddleware from './middleware/tagmanager-middleware';
import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';
import TagManager from 'react-gtm-module';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles';
import smoothscroll from 'smoothscroll-polyfill';
import { warningNotificationBanner } from './banner/dux';

declare var ENV:string;
declare var ROUTE_BASENAME:string;
declare var GTM;

if (ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, { include: [/^/], exclude: [/^StyledComponent/, /^Connect/, /^ReactTouchEvents/, /^MediaQuery/]});
}

// kick off the polyfill!
smoothscroll.polyfill();

TagManager.initialize(GTM);

const bugsnagClient = bugsnag({
  apiKey: '2403ac729529750d296e1e4ee022f7dc',
  releaseStage: ENV,
  notifyReleaseStages: [ 'production', 'staging' ],
});

bugsnagClient.use(bugsnagReact, React);

const ErrorBoundary = bugsnagClient.getPlugin('react');

const actorMiddlewareApplied = actorMiddleware(
  ChatActor,
  serviceActor,
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewareList = [actorMiddlewareApplied, tagManagerMiddleware];

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  transforms: [
    createWhitelistFilter('feed', ['isAuthenticated', 'auth', 'persistExpiresAt']),
    createExpirationTransform({
      defaultState,
    }),
  ],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = createStore(
  persistedReducer,
  composeEnhancers(
    applyMiddleware(...middlewareList)
  )
);

if (navigator.userAgent.match('CriOS')) {
  store.dispatch(warningNotificationBanner('We’re optimizing Host Tools for Chrome. For now, please switch to Safari.'));
}

const persistor = persistStore(store);

const content = document.getElementById('content');

if (content) {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ErrorBoundary>
          <ThemeProvider theme={theme}>
            <>
              <GlobalStyle />
              <Router basename={ROUTE_BASENAME}>
                <Switch>
                  <Route exact path='/' component={Chop}/>
                  <Route exact path='/login' component={Login}/>
                </Switch>
              </Router>
            </>
          </ThemeProvider>
        </ErrorBoundary>
      </PersistGate>
    </Provider>,
    content);
}

// expose store when run in Cypress
if (window.Cypress) {
  window.store = store;
}

if (document.body) {
  window.addEventListener('orientationchange', () => {
    if (document.activeElement) {
      document.activeElement.blur();
    }
    window.scrollTo({top:0, behavior:'instant'});
  });
}
