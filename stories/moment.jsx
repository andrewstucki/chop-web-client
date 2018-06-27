// @flow
/* global module */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { createMessage } from '../src/moment';
import { publishPrayerRequestNotification } from '../src/moment/actionableNotification/dux';
import {
  publishPrayerNotification,
  publishJoinedChatNotification,
  publishLeftChatNotification,
} from '../src/moment/notification/dux';


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
  ))
  .add('Live prayer notification', () => (
    <Provider store={store}>
      <Moment
        data={
          publishPrayerNotification('Billyboy', 'Jilliejoy')
        }
      />
    </Provider>
  ))
  .add('Joined chat notification', () => (
    <Provider store={store}>
      <Moment
        data={
          publishJoinedChatNotification('Billyboy', 'public')
        }
      />
    </Provider>
  ))
  .add('Left chat notification', () => (
    <Provider store={store}>
      <Moment
        data={
          publishLeftChatNotification('Billyboy', 'public')
        }
      />
    </Provider>
  ))
  .add('Prayer request notification active', () => (
    <Provider store={store}>
      <Moment
        data={
          publishPrayerRequestNotification('Billyboy', true)
        }
      />
    </Provider>
  ))
  .add('Prayer request notification inactive', () => (
    <Provider store={store}>
      <Moment
        data={
          publishPrayerRequestNotification('Billyboy', false)
        }
        // TODO add an action for the onClick
      />
    </Provider>
  ));
