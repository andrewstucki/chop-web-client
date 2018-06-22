/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import NavBar from '../src/navBar/navBar';

storiesOf('NavBar', module)
  .add('default', () => (
    <NavBar
      channels={[
        {id: 'public', isCurrent: true, hasActions: false},
        {id: 'host', isCurrent: false, hasActions: false},
      ]}
      onClick={action('clicked')}
    />
  )).add('host', () => (
    <NavBar
      channels={[
        {id: 'default', isCurrent: false, hasActions: false},
        {id: 'HOST', isCurrent: true, hasActions: false},
      ]}
      onClick={action('clicked')}
    />
  )).add('host pip', () => (
    <NavBar
      channels={[
        {id: 'default', isCurrent: true, hasActions: false},
        {id: 'host', isCurrent: false, hasActions: true},
      ]}
      onClick={action('clicked')}
    />
  )).add('default pip', () => (
    <NavBar
      channels={[
        {id: 'default', isCurrent: true, hasActions: true},
        {id: 'host', isCurrent: false, hasActions: false},
      ]}
      onClick={action('clicked')}
    />
  ));
