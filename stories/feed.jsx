// @flow
/* global module */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import Feed from '../src/feed/feed';

const store = createStore(() => {});

const user1 = {
  pubnubToken: '123456',
  name: 'Billy Bob',
  role: { label: '' },
};
const user2 = {
  pubnubToken: '4567890',
  name: 'Joan Jet',
  role: { label: '' },
};

storiesOf('Feed', module)
  .add('blank', () => (
    <Provider store={store}>
      <div style={{display:'flex', height: '500px', flexDirection: 'column'}}>
        <Feed
          moments={[]}
          anchorMoments={[]}
          currentChannel="default"
          appendingMessage={false}
          animatingMoment={false}
          isPlaceholderPresent={false}
          showLeaveChat={true}
          isPopUpModalVisible={false}
          togglePopUpModal={() => {}}
          scrollPosition={0}
          updateScrollPosition={() => {}}
          channel="default"
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
                user: user1,
                messageTrayOpen: false,
              },
              {
                type: 'MESSAGE',
                id: 'string',
                text: 'Goodbye',
                user: user2,
                messageTrayOpen: false,
              },
            ]
          }
          anchorMoments={[]}
          animatingMoment={false}
          isPlaceholderPresent={false}
          showLeaveChat={true}
          isPopUpModalVisible={false}
          togglePopUpModal={() => {}}
          scrollPosition={0}
          updateScrollPosition={() => {}}
          channel="default"
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
                user: user1,
                messageTrayOpen: false,
              },
              {
                type: 'MESSAGE',
                id: 'string',
                text: 'Goodbye',
                user: user2,
                messageTrayOpen: false,
              },
            ]
          }
          anchorMoments={[]}
          animatingMoment={false}
          isPlaceholderPresent={false}
          showLeaveChat={true}
          isPopUpModalVisible={false}
          togglePopUpModal={() => {}}
          scrollPosition={0}
          updateScrollPosition={() => {}}
          channel="default"
        />
      </div>
    </Provider>
  ));
