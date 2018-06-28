/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FeedActionBanner from '../src/feed/feedActionBanner';

storiesOf('FeedActionBanner', module)
  .add('default', () => (
    <FeedActionBanner
      text="Leave"
      action={action('clicked')}
    />
  ));
