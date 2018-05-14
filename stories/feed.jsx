import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Feed from '../src/feed/feed';

storiesOf('Feed', module)
  .add('blank', () => (
    <div style={{display:'flex', height: '500px', flexDirection: 'column'}}>
      <Feed />
    </div>
  )).add('with messages', () => (
    <div style={{display:'flex', height: '500px', flexDirection: 'column'}}>
      <Feed moments={
        [
          {id:'1', message:'Hello, World!'},
          {id:'1', message:'Goodbye'}
        ]}
        offset={-500}
        onMessageRender={action('message mounted')} />
    </div>
  ))