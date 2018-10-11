// @flow
/* global module */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Moment from '../src/moment/moment';
import '../assets/global.css';

const user = {
  pubnubToken: '12345',
  name: 'Billy Bob',
  role: { label: '' },
};

const store = createStore(() => (
  {
    feed: {
      currentUser: user,
      channels: {
        abc123: {
          id: 'abc123',
          name: 'Host',
          moments: [],
        }
      }
    },
  }
));

storiesOf('Moment', module)
  .add('Message tray closed', () => (
    <Provider store={store}>
      <Moment
        data={
          {
            type: 'MESSAGE',
            id: '12345',
            text: 'Maecenas sed diam eget risus varius blandit sit amet non magna.',
            user: user,
            messageTrayOpen: false,
            closeTrayButtonRendered: false,
          }
        }
      />
    </Provider>
  ))
  .add('Message tray open', () => (
    <Provider store={store}>
      <Moment
        data={
          {
            type: 'MESSAGE',
            id: '12345',
            text: 'Maecenas sed diam eget risus varius blandit sit amet non magna.',
            user: user,
            messageTrayOpen: true,
            closeTrayButtonRendered: true,
          }
        }
      />
    </Provider>
  ))
  .add('Live prayer notification', () => (
    <Provider store={store}>
      <Moment
        data={
          {
            type: 'NOTIFICATION',
            notificationType: 'PRAYER',
            id: '12345',
            host: 'Pickle',
            guest: 'Cucumber',
            timeStamp: '9:33pm',
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
            type: 'NOTIFICATION',
            notificationType: 'JOINED_CHAT',
            id: '12345',
            name: 'Pickle',
            timeStamp: '9:33pm',
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
            type: 'NOTIFICATION',
            notificationType: 'LEFT_CHAT',
            id: '12345',
            name: 'Pickle',
            timeStamp: '9:33pm',
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
            type: 'ACTIONABLE_NOTIFICATION',
            notificationType: 'PRAYER_REQUEST',
            id: '12345',
            user: user,
            timeStamp: '9:33pm',
            active: true,
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
            type: 'ACTIONABLE_NOTIFICATION',
            notificationType: 'PRAYER_REQUEST',
            id: '12345',
            user: user,
            timeStamp: '9:33pm',
            active: false,
            action: action('clicked'),
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
            text: 'Chat request pending',
          }
        }
      />
    </Provider>
  ))
  .add('AvatarMoment', () => (
    <Provider store={store}>
      <Moment
        data={
          {
            type: 'AVATAR_MOMENT',
            id: '12345',
            user: user,
          }
        }
      />
    </Provider>
  ));
