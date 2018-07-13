// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Chop from './chop';
import reducer from './chop/dux';
import thunk from 'redux-thunk';
import {setStore} from './io/chat';
import { publishSalvation } from './placeholder/anchorMoment/dux';

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

// All this is a hacety Hack to get chat working before 
// Our services are ready, enjoy
store.dispatch(
  {
    type: 'SET_VIDEO_URL',
    url: 
`https://www.youtube.com/embed/bz2kN31m_S0?
rel=0&
autoplay=1&
fs=0&
playsinline=1`,
  }
);

store.dispatch(
  {
    type: 'SET_CHAT_KEYS',
    publishKey: 'pub-c-5d166bf0-07cf-4e5b-81e6-797b7f01bf83',
    subscribeKey: 'sub-c-12f3b1fe-e04d-11e7-b7e7-02872c090099',
  }
);

const characters = [
  'George Jettson',
  'Judy Jettson',
  'Jane Jettson',
  'Astro',
  'Elroy Jettson',
  'Rosie',
  'Orbitty',
  'Cosmo Spacely',
  'Fred Flintstone',
  'Wilma Flintstone',
  'Pebbles FlintStone',
  'Barney Rubble',
  'Betty Rubble',
  'Bamm-Bamm Rubble',
  'Mr. Slate',
  'Dino',
  'Yogi Bear',
  'Boo Boo Bear',
  'Ranger Smith',
  'Atom Ant',
  'Snagglepuss',
  'Dick Dastardly',
  'Penelope Pitstop',
  'Space Ghost',
  'Huckleberry Hound',
];

const characterName = characters[Math.floor(Math.random() * characters.length)];

store.dispatch(
  {
    type: 'SET_USER',
    id: new Date().getTime().toString(),
    nickname: characterName,
  }
);

setTimeout(() => {
  store.dispatch(
    {
      type: 'ADD_CHAT',
      channelId: 'public',
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

  store.dispatch(
    {
      type: 'ADD_CHAT',
      channelId: 'request',
      channelToken: 'request',
    }
  );
  store.dispatch(
    {
      type: 'ADD_CHAT',
      channelId: 'command',
      channelToken: 'command',
    }
  );
  store.dispatch(publishSalvation(2));
}, 2000);
