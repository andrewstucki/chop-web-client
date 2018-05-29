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
          {
            id: '1',
            message: 'Hello',
            user: {
              id: 'a',
              nickname: 'Billy Bob',
            }
          },
          {
            id: '2',
            message: 'Goodbye',
            user: {
              id: 'b',
              nickname: 'Joe Joe',
            }
          }
        ]}
        offset={-500}
        onMessageRender={action('message mounted')} />
    </div>
  ))