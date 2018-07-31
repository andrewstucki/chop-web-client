// @flow
/* global module */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import { createMessage } from '../src/moment';

import Feed from '../src/feed/feed';

const store = createStore(() => {});

storiesOf('Feed', module)
  .add('blank', () => (
    <Provider store={store}>
      <div style={{display:'flex', height: '500px', flexDirection: 'column'}}>
        <Feed
          moments={[]}
          currentChannel="default"
          appendingMessage={false}
          animatingMoment={false}
          placeholderPresent={false}
          channels={
            {
              direct: {
                id: '12345',
                name: 'Carl',
                moments: [],
                participants: [
                  {
                    id: '12345',
                    nickname: 'Bootbot',
                  },
                  {
                    id: '54321',
                    nickname: 'Sockrock',
                  },
                ],
              },
            }
          }
          hasParticipants={false}
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
          animatingMoment={false}
          placeholderPresent={false}
          channels={
            {
              direct: {
                id: '12345',
                name: 'Carl',
                moments: [],
                participants: [
                  {
                    id: '12345',
                    nickname: 'Bootbot',
                  },
                  {
                    id: '54321',
                    nickname: 'Sockrock',
                  },
                ],
                hasParticipants: true,
              },
            }
          }
          hasParticipants={false}
        />
      </div>
    </Provider>
  ))
  .add('with participants', () => (
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
          animatingMoment={false}
          placeholderPresent={false}
          channels={
            {
              direct: {
                id: '12345',
                name: 'Carl',
                moments: [],
                participants: [
                  {
                    id: '12345',
                    nickname: 'Bootbot',
                  },
                  {
                    id: '54321',
                    nickname: 'Sockrock',
                  },
                ],
                hasParticipants: true,
              },
            }
          }
          hasParticipants={true}
        />
      </div>
    </Provider>
  ));
