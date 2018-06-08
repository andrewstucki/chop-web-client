// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Feed from '../src/feed/feed';

storiesOf('Feed', module)
  .add('blank', () => (
    <div style={{display:'flex', height: '500px', flexDirection: 'column'}}>
      <Feed appendingMessage={false} channel="default" />
    </div>
  )).add('with messages', () => (
    <div style={{display:'flex', height: '500px', flexDirection: 'column'}}>
      <Feed
        appendingMessage={false}
        channel="default"
        moments={
          [
            {
              id: '1',
              text: 'Hello',
              user: {
                id: 'a',
                nickname: 'Billy Bob',
              },
              messageTrayOpen: false,
            },
            {
              id: '2',
              text: 'Goodbye',
              user: {
                id: 'b',
                nickname: 'Joe Joe',
              },
              messageTrayOpen: false,
            },
          ]
        }
        offset={-500}
        onMessageRender={action('message mounted')}
      />
    </div>
  ))
