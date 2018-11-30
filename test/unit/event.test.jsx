// @flow
import Adapter from 'enzyme-adapter-react-16';
import Event from '../../src/pane/content/event';
import Chat from '../../src/pane/content/chat';
import reducer, { defaultState } from '../../src/feed/dux';
import Enzyme from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

Enzyme.configure({ adapter: new Adapter() });

// TODO: Timezone while running in CI does not match local timezone, skipping for now
test.skip('Offline renders when no event.', () => {
  const store = createStore(
    reducer,
    {
      feed: {
        ...defaultState,
        schedule: [
          {
            endTime: 1543439700,
            fetchTime: 1543437972,
            id: '132487',
            scheduleTime: 1543438800,
            startTime: 1543438200,
            title: 'Church Service',
          },
        ],
      },
    }
  );

  const wrapper = Enzyme.mount(
    <Provider store={store}>
      <div>
        <Event />
      </div>   
    </Provider>
  );

  expect(wrapper.find('p')).toHaveLength(3);
  expect(wrapper.find('p').at(0).text()).toEqual('Upcoming Event');
  expect(wrapper.find('p').at(1).text()).toEqual('Church Service');
  expect(wrapper.find('p').at(2).text()).toEqual('3:00pm Wednesday, Nov. 28');
});

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
      },
    }
  );

  const wrapper = Enzyme.mount(
    <Provider store={store}>
      <div>
        <Event />
      </div>   
    </Provider>
  );

  expect(wrapper.find(Chat)).toHaveLength(1);
});
