// @flow
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
      openMenu={() => {}}
    />
  )).add('host', () => (
    <NavBar
      channels={[
        {id: 'public', isCurrent: false, hasActions: false},
        {id: 'host', isCurrent: true, hasActions: false},
      ]}
      onClick={action('clicked')}
      openMenu={() => {}}
    />
  )).add('host pip', () => (
    <NavBar
      channels={[
        {id: 'public', isCurrent: true, hasActions: false},
        {id: 'host', isCurrent: false, hasActions: true},
      ]}
      onClick={action('clicked')}
      openMenu={() => {}}
    />
  )).add('default pip', () => (
    <NavBar
      channels={[
        {id: 'public', isCurrent: true, hasActions: true},
        {id: 'host', isCurrent: false, hasActions: false},
      ]}
      onClick={action('clicked')}
      openMenu={() => {}}
    />
  )).add('direct chat', () => (
    <NavBar
      channels={[
        {id: 'public', isCurrent: true, hasActions: true},
        {id: 'host', isCurrent: false, hasActions: false},
        {id: 'direct1', isCurrent: false, hasActions: false, otherUserName: 'bob'},
        {id: 'direct2', isCurrent: false, hasActions: false, otherUserName: 'dave'},
      ]}
      onClick={action('clicked')}
      openMenu={() => {}}
    />
  )).add('direct chat bob selected', () => (
    <NavBar
      channels={[
        {id: 'public', isCurrent: false, hasActions: false},
        {id: 'host', isCurrent: false, hasActions: false},
        {id: 'direct1', isCurrent: true, hasActions: false, otherUserName: 'bob'},
        {id: 'direct2', isCurrent: false, hasActions: false, otherUserName: 'dave'},
      ]}
      onClick={action('clicked')}
      openMenu={() => {}}
    />
  ));
