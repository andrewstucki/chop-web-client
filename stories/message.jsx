/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Message from '../src/message/message';
import '../assets/global.css';

storiesOf('Message', module)
  .add('simple', () => (
    <Message message={
        {
          id: '1234',
          text: 'Maecenas sed diam eget risus varius blandit sit amet non magna.',
          user: {
            id: '12345',
            nickname: 'Billy Bob',
          },
          messageTrayOpen: false,
        }
      }
    />
  ))
  .add('Message tray open', () => (
    <Message message={
        {
          id: '1234',
          text: 'Maecenas sed diam eget risus varius blandit sit amet non magna.',
          user: {
            id: '12345',
            nickname: 'Billy Bob',
          },
          messageTrayOpen: true,
        }
      }
    />
  ))
