// @flow
import Adapter from 'enzyme-adapter-react-16';
import Event from '../../src/pane/content/event';
import Chat from '../../src/pane/content/chat';
import reducer, { defaultState } from '../../src/feed/dux';
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
      feed: {
        ...defaultState,
        event: {
          title: 'Mastermind',
          id: 129073,
          startTime: 1543585500,
          videoStartTime: 1543586400,
        },
        panes: {
          primary: {
            type: 'EVENT',
            content: {},
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
