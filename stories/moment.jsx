// @flow
/* global module */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { createMessage } from '../src/moment';
import Moment from '../src/moment/moment';
import '../assets/global.css';

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
            true,
          )
        }
      />
    </Provider>
  ))
  .add('Live prayer notification', () => (
    <Provider store={store}>
      <Moment
        data={
          {
            type: 'PUBLISH_MOMENT_TO_CHANNEL',
            channel: 'host',
            moment: {
              type: 'NOTIFICATION',
              notificationType: 'PRAYER',
              host: 'Pickle',
              guest: 'Cucumber',
              timeStamp: '9:33pm',
            },
          }
        }
      />
    </Provider>
  ))
  .add('Joined chat notification', () => (
    <Provider store={store}>
      <Moment
        data={
          {
            type: 'PUBLISH_MOMENT_TO_CHANNEL',
            channel: 'host',
            moment: {
              type: 'NOTIFICATION',
              notificationType: 'JOINED_CHAT',
              name: 'Pickle',
              timeStamp: '9:33pm',
            },
          }
        }
      />
    </Provider>
  ))
  .add('Left chat notification', () => (
    <Provider store={store}>
      <Moment
        data={
          {
            type: 'PUBLISH_MOMENT_TO_CHANNEL',
            channel: 'host',
            moment: {
              type: 'NOTIFICATION',
              notificationType: 'LEFT_CHAT',
              name: 'Pickle',
              timeStamp: '9:33pm',
            },
          }
        }
      />
    </Provider>
  ))
  .add('Prayer request notification active', () => (
    <Provider store={store}>
      <Moment
        data={
          {
            type: 'PUBLISH_MOMENT_TO_CHANNEL',
            channel: 'host',
            moment: {
              type: 'ACTIONABLE_NOTIFICATION',
              notificationType: 'PRAYER_REQUEST',
              name: 'Pickle',
              timeStamp: '9:33pm',
              active: true,
              action: action('clicked'),
            },
          }
        }
      />
    </Provider>
  ))
  .add('Prayer request notification inactive', () => (
    <Provider store={store}>
      <Moment
        data={
          {
            type: 'PUBLISH_MOMENT_TO_CHANNEL',
            channel: 'host',
            moment: {
              type: 'ACTIONABLE_NOTIFICATION',
              notificationType: 'PRAYER_REQUEST',
              name: 'Pickle',
              timeStamp: '9:33pm',
              active: false,
              action: action('clicked'),
            },
          }
        }
      />
    </Provider>
  ))
  .add('Salvation anchor moment as a moment', () => (
    <Provider store={store}>
      <Moment
        data={
          {
            type: 'ANCHOR_MOMENT',
            id: '12345',
            text: 'I commit my life to Christ.',
            subText: '1 hand raised',
            showReleaseAnchorButton: false,
          }
        }
      />
    </Provider>
  ))
  .add('Basic Text default', () => (
    <Provider store={store}>
      <Moment
        data={
          {
            type: 'BASIC_TEXT',
            text: 'Chat request pending'
          }
        }
      />
    </Provider>
  ));
