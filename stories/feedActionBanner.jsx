/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import FeedActionBanner from '../src/feed/feedActionBanner';

storiesOf('FeedActionBanner', module)
  .add('Leave direct chat', () => (
    <FeedActionBanner
      text="Leave"
      action={action('clicked')}
    />
  ))
  .add('Cancel direct chat', () => (
    <FeedActionBanner
      text="Cancel"
      action={action('clicked')}
    />
  ));
