import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NavBar from '../src/navBar/navBar';

storiesOf('NavBar', module)
  .add('default', () => (
    <NavBar
      channels={[
        {channel: 'DEFAULT', isCurrent: true},
        {channel: 'HOST', isCurrent: false},
      ]}
      onClick={action('clicked')}
    />
  )).add('host', () => (
    <NavBar
      channels={[
        {channel: 'DEFAULT', isCurrent: false},
        {channel: 'HOST', isCurrent: true},
      ]}
      onClick={action('clicked')}
    />
  ));
