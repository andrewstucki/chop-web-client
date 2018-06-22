/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NavBar from '../src/navBar/navBar';

storiesOf('NavBar', module)
  .add('default', () => (
    <NavBar
      channels={[
        {channel: 'default', isCurrent: true, hasActions: false},
        {channel: 'host', isCurrent: false, hasActions: false},
      ]}
      onClick={action('clicked')}
    />
  )).add('host', () => (
    <NavBar
      channels={[
        {channel: 'default', isCurrent: false, hasActions: false},
        {channel: 'HOST', isCurrent: true, hasActions: false},
      ]}
      onClick={action('clicked')}
    />
  )).add('host pip', () => (
    <NavBar
      channels={[
        {channel: 'default', isCurrent: true, hasActions: false},
        {channel: 'host', isCurrent: false, hasActions: true},
      ]}
      onClick={action('clicked')}
    />
  )).add('default pip', () => (
    <NavBar
      channels={[
        {channel: 'default', isCurrent: true, hasActions: true},
        {channel: 'host', isCurrent: false, hasActions: false},
      ]}
      onClick={action('clicked')}
    />
  ));
