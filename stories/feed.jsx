// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Feed from '../src/feed/feed';

const store = createStore(() => {});

storiesOf('Feed', module)
  .add('blank', () => (
    <Provider store={store}>
      <div style={{display:'flex', height: '500px', flexDirection: 'column'}}>
        <Feed
          channel="default"
          appendingMessage={false}
          channel="default"
          moments={[]}
        />
      </div>
    </Provider>
  )).add('with messages', () => (
    <Provider store={store}>
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
        />
      </div>
    </Provider>
  ))
