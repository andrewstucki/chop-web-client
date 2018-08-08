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
        {id: 'public', isCurrent: true, hasActions: false, otherUsersNames: []},
        {id: 'host', isCurrent: false, hasActions: false, otherUsersNames: []},
      ]}
      onClick={action('clicked')}
      openMenu={() => {}}
    />
  )).add('host', () => (
    <NavBar
      channels={[
        {id: 'public', isCurrent: false, hasActions: false, otherUsersNames: []},
        {id: 'host', isCurrent: true, hasActions: false, otherUsersNames: []},
      ]}
      onClick={action('clicked')}
      openMenu={() => {}}
    />
  )).add('host pip', () => (
    <NavBar
      channels={[
        {id: 'public', isCurrent: true, hasActions: false, otherUsersNames: []},
        {id: 'host', isCurrent: false, hasActions: true, otherUsersNames: []},
      ]}
      onClick={action('clicked')}
      openMenu={() => {}}
    />
  )).add('default pip', () => (
    <NavBar
      channels={[
        {id: 'public', isCurrent: true, hasActions: true, otherUsersNames: []},
        {id: 'host', isCurrent: false, hasActions: false, otherUsersNames: []},
      ]}
      onClick={action('clicked')}
      openMenu={() => {}}
    />
  )).add('direct chat', () => (
    <NavBar
      channels={[
        {id: 'public', isCurrent: true, hasActions: true, otherUsersNames: []},
        {id: 'host', isCurrent: false, hasActions: false, otherUsersNames: []},
        {id: 'direct1', isCurrent: false, hasActions: false, otherUsersNames: ['bob']},
        {id: 'direct2', isCurrent: false, hasActions: false, otherUsersNames: ['dave']},
      ]}
      onClick={action('clicked')}
      openMenu={() => {}}
    />
  )).add('direct chat bob selected', () => (
    <NavBar
      channels={[
        {id: 'public', isCurrent: false, hasActions: false, otherUsersNames: []},
        {id: 'host', isCurrent: false, hasActions: false, otherUsersNames: []},
        {id: 'direct1', isCurrent: true, hasActions: false, otherUsersNames: ['bob']},
        {id: 'direct2', isCurrent: false, hasActions: false, otherUsersNames: ['dave']},
      ]}
      onClick={action('clicked')}
      openMenu={() => {}}
    />
  ));
