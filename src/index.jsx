// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import Chop from './chop';
import reducer from './chop/dux';
import thunk from 'redux-thunk';
import {setStore} from './io/chat';
import {setUser} from './io/chat/dux';
import { publishSalvation } from './placeholder/anchorMoment/dux';
import { addChannel } from './feed/dux';

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
    publishKey: 'pub-c-1d485d00-14f5-4078-9ca7-19a6fe6411a7',
    subscribeKey: 'sub-c-1dc5ff9a-86b2-11e8-ba2a-d686872c68e7',
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
  'Bobby G.',
  'Craig G.',
  'Sam R.',
  'Jerry H.',
];

const characterName = characters[Math.floor(Math.random() * characters.length)];

store.dispatch(setUser(
  {
    id: new Date().getTime().toString(),
    name: characterName,
    pubnubToken: new Date().getTime().toString(),
    pubnubAccessToken: '',
    role: {
      label: 'HOST',
      permissions: [],
    },
  }
));

setTimeout(() => {
  store.dispatch(addChannel('public', 'public'));

  store.dispatch(addChannel('host', 'host'));

  store.dispatch(addChannel('request', 'request'));

  store.dispatch(addChannel('command', 'command'));

  store.dispatch(
    {
      type: 'CHANGE_CHANNEL',
      channel: 'public',
    }
  );

  store.dispatch(publishSalvation(2));
}, 2000);
