// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Chop from './chop';
import reducer from './chop/dux';
import thunk from 'redux-thunk';
import {setStore} from './io/chat';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

setStore(store);

const content = document.getElementById('content');

if (content) {
  ReactDOM.render(
    <Provider store={store}>
      <Chop />
    </Provider>,
    content);
}

// All this is a hacety Hack to get chat working before 
// Our services are ready, enjoy
store.dispatch(
  {
    type: 'SET_CHAT_KEYS',
    publishKey: 'pub-c-09e2a65a-062e-46ae-a169-34368baf04ca',
    subscribeKey: 'sub-c-a0ba8ad8-5854-11e8-8e44-e61bc5f8fbda',
  }
);

store.dispatch(
  {
    type: 'SET_USER',
    id: new Date().getTime(),
    nickname: 'Billy Bob',
  }
);

setTimeout(() => {
  store.dispatch(
    {
      type: 'ADD_CHAT',
      channelId: 'default',
      channelToken: 'public',
    }
  );

  store.dispatch(
    {
      type: 'ADD_CHAT',
      channelId: 'host',
      channelToken: 'host',
    }
  );
}, 2000);