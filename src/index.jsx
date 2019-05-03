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
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './io/saga';
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
import tagManagerMiddleware from './middleware/tagmanager-middleware';
import TagManager from 'react-gtm-module';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles';
import { ErrorBoundary } from './util/bugsnag';
import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { setLanguage } from './languageSelector/dux';

declare var ENV:string;
declare var ROUTE_BASENAME:string;
declare var GTM;

if (ENV === 'development') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js');
  whyDidYouRender(React);
}

TagManager.initialize(GTM);

const actorMiddlewareApplied = actorMiddleware(
  ChatActor,
);

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middlewareList = [actorMiddlewareApplied, tagManagerMiddleware, sagaMiddleware];

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ['sequence', 'schedule'],
  transforms: [
    createWhitelistFilter('feed', ['isAuthenticated', 'auth', 'persistExpiresAt', 'languageOptions']),
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

sagaMiddleware.run(rootSaga);

// Leaving this in the index for now so it can have access to store
i18n
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    ns: ['common','forms','moments','notifications'],
    defaultNS: 'common',
    load: 'currentOnly',
    fallbackLng: 'en-US',
    whitelist: ['en'],
    nonExplicitWhitelist: true,  // allows 'en' and 'en-US'
    debug: ENV !== 'production',
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
    react: {
      wait: true,
    },
  }, () => store.dispatch(setLanguage(i18n.language)));

const persistor = persistStore(store);

const content = document.getElementById('content');

if (content) {
  ReactDOM.render(
    <React.Suspense fallback=''>
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
      </Provider>
    </React.Suspense>
    ,
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

export { i18n };
