/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FeedActionBanner from '../src/feed/feedActionBanner';

storiesOf('FeedActionBanner', module)
  .add('Leave direct chat', () => (
    <FeedActionBanner
      data={
        {
          type: 'LEAVE_DIRECT_CHAT',
          channel: 'host',
        }
      }
    />
  ))
  .add('Cancel direct chat', () => (
    <FeedActionBanner
      data={
        {
          type: 'CANCEL_DIRECT_CHAT',
          channel: 'host',
        }
      }
    />
  ));
