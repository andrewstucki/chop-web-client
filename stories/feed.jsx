// @flow
/* global module */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

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
          hasParticipants={false}
          isPopUpModalVisible={false}
          togglePopUpModal={() => {}}
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
              {
                type: 'MESSAGE',
                id: 'string',
                text: 'Hello',
                user: {
                  id: '12345',
                  nickname: 'Bobby Boucher',
                },
                messageTrayOpen: false,
              },
              {
                type: 'MESSAGE',
                id: 'string',
                text: 'Goodbye',
                user: {
                  id: '12345',
                  nickname: 'Vicki Vallencourt',
                },
                messageTrayOpen: false,
              },
            ]
          }
          animatingMoment={false}
          placeholderPresent={false}
          hasParticipants={false}
          isPopUpModalVisible={false}
          togglePopUpModal={() => {}}
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
              {
                type: 'MESSAGE',
                id: 'string',
                text: 'Hello',
                user: {
                  id: '12345',
                  nickname: 'Bobby Boucher',
                },
                messageTrayOpen: false,
              },
              {
                type: 'MESSAGE',
                id: 'string',
                text: 'Goodbye',
                user: {
                  id: '12345',
                  nickname: 'Vicki Vallencourt',
                },
                messageTrayOpen: false,
              },
            ]
          }
          animatingMoment={false}
          placeholderPresent={false}
          hasParticipants={true}
          isPopUpModalVisible={false}
          togglePopUpModal={() => {}}
        />
      </div>
    </Provider>
  ));
