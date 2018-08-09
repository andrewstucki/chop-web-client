// @flow
/* global module */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';

import { createMessage } from '../src/moment';

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
              createMessage(
                '1',
                'Hello',
                user1,
                false,
              ),
              createMessage(
                '2',
                'Goodbye',
                user2,
                false,
              ),
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
              createMessage(
                '1',
                'Hello',
                user1,
                false,
              ),
              createMessage(
                '2',
                'Goodbye',
                user2,
                false,
              ),
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
