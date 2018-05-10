import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Feed from '../src/feed/feed';

storiesOf('Feed', module)
  .add('blank', () => (
    <Feed />
  )).add('with messages', () => (
    <Feed moments={
      [
        {id:'1', message:'Hello, World!'},
        {id:'1', message:'Goodbye'}
      ]} />
  ))