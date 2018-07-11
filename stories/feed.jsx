// @flow
/* global module */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import Feed from '../src/feed/feed';
import { createMessage } from '../src/moment';

const store = createStore(() => {});

storiesOf('Feed', module)
  .add('blank', () => (
    <Provider store={store}>
      <div style={{display:'flex', height: '500px', flexDirection: 'column'}}>
        <Feed
          moments={[]}
          currentChannel="default"
          appendingMessage={false}
          renderingAnchorMoment={false}
          placeholderPresent={false}
        />
      </div>
    </Provider>
  )).add('with messages', () => (
    <Provider store={store}>
      <div style={{display:'flex', height: '500px', flexDirection: 'column'}}>
        <Feed
          appendingMessage={false}
          currentChannel="default"
          moments={
            [
              createMessage(
                '1',
                'Hello',
                {
                  id: 'a',
                  nickname: 'Billy Bob',
                },
                false,
              ),
              createMessage(
                '2',
                'Goodbye',
                {
                  id: 'b',
                  nickname: 'Joe Joe',
                },
                false,
              ),
            ]
          }
          renderingAnchorMoment={false}
          placeholderPresent={false}
        />
      </div>
    </Provider>
  ));
