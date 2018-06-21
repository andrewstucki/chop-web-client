/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NavBar from '../src/navBar/navBar';

storiesOf('NavBar', module)
  .add('default', () => (
    <NavBar
      channels={[
        {channel: 'public', isCurrent: true},
        {channel: 'host', isCurrent: false},
      ]}
      onClick={action('clicked')}
    />
  )).add('host', () => (
    <NavBar
      channels={[
        {channel: 'public', isCurrent: false},
        {channel: 'host', isCurrent: true},
      ]}
      onClick={action('clicked')}
    />
  ));
