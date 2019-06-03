// @flow
import Adapter from 'enzyme-adapter-react-16';
import Event from '../../src/pane/content/event';
import Chat from '../../src/pane/content/chat';
import reducer, { defaultState } from '../../src/chop/dux';
import Enzyme from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { mockDate, mountWithTheme } from '../testUtils';

Enzyme.configure({ adapter: new Adapter() });
mockDate('Wed Nov 28 2018 21:00:00 GMT-0000');

test('Event renders when there is an event.', () => {
  const store = createStore(
    reducer,
    {
      ...defaultState,
      feed: {
        ...defaultState.feed,
        event: {
          title: 'Mastermind',
          id: 129073,
          startTime: 1543585500,
          videoStartTime: 1543586400,
          enabledFeatures: {
            chat: true,
          },
        },
        panes: {
          primary: {
            type: 'EVENT',
            content: {
              channelId: 'event',
            },
          },
        },
      },
    }
  );

  const wrapper = mountWithTheme(
    <Provider store={store}>
      <div>
        <Event />
      </div>
    </Provider>
  );

  expect(wrapper.find(Chat)).toHaveLength(1);
});
