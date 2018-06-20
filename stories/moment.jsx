/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Moment from '../src/moment/moment';
import '../assets/global.css';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { createMessage } from '../src/moment';

const store = createStore(() => {});

storiesOf('Moment', module)
  .add('Message tray closed', () => (
    <Provider store={store}>
      <Moment
        data={
          createMessage(
            '1234',
            'Maecenas sed diam eget risus varius blandit sit amet non magna.',
            {
              id: '12345',
              nickname: 'Billy Bob',
            },
            false,
          )
        }
      />
    </Provider>
  ))
  .add('Message tray open', () => (
    <Provider store={store}>
      <Moment
        data={
          createMessage(
            '1234',
            'Maecenas sed diam eget risus varius blandit sit amet non magna.',
            {
              id: '12345',
              nickname: 'Billy Bob',
            },
            true,
          )
        }
      />
    </Provider>
  ));
