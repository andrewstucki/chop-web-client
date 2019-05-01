// @flow
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import HostInfo from '../../src/hostInfo';
import { Wrapper, NoHostInfo } from '../../src/hostInfo/styles';
import { createStore } from 'redux';
import reducer, {defaultState} from '../../src/feed/dux';
import { Provider } from 'react-redux';
import { mountWithTheme } from '../testUtils';

Enzyme.configure({ adapter: new Adapter() });

describe('Host Info tests', () => {
  test('Gets it from the event when there is an active event.', () => {
    const store = createStore(
      reducer,
      {
        schedule: [],
        sequence: {
          serverTime: 0,
          steps: [],
        },
        feed: {
          ...defaultState,
          event: {
            title: 'Event',
            id: '123',
            eventTimeId: '0',
            startTime: 0,
            hostInfo: '<p>The information for the hosts.</p>',
          },
        },
      }
    );

    const wrapper = mountWithTheme(
      <Provider store={store}>
        <HostInfo />
      </Provider>
    );
    expect(wrapper.find(Wrapper).text()).toEqual('The information for the hosts.');
  });

  test('Gets it from the schedule when there is not an active event.', () => {
    const store = createStore(
      reducer,
      {
        schedule: [
          {
            id: '1',
            startTime: 0,
            endTime: 0,
            title: 'Next Event',
            hostInfo: '<p>The information for the hosts.</p>',
          },
        ],
        sequence: {
          serverTime: 0,
          steps: [],
        },
        feed: {
          ...defaultState,
        },
      }
    );

    const wrapper = mountWithTheme(
      <Provider store={store}>
        <HostInfo />
      </Provider>
    );
    expect(wrapper.find(Wrapper).text()).toEqual('The information for the hosts.');
  });

  test('Renders empty state.', () => {
    const store = createStore(
      reducer,
      {
        feed: defaultState,
        schedule: [],
        sequence: {
          serverTime: 0,
          steps: [],
        },
      }
    );

    const wrapper = mountWithTheme(
      <Provider store={store}>
        <HostInfo />
      </Provider>
    );
    expect(wrapper.find(Wrapper).exists()).toBeFalsy();
    expect(wrapper.find(NoHostInfo).exists()).toBeTruthy();
    expect(wrapper.find(NoHostInfo).text()).toEqual('There is no Host Info for this event.');
  });
});
