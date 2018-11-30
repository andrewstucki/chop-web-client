// @flow
import Adapter from 'enzyme-adapter-react-16';
import Offline from '../../src/pane/content/offline';
import Enzyme from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../src/chop/dux';
import { defaultState } from '../../src/feed/dux';

Enzyme.configure({ adapter: new Adapter() });

describe('Offline Componenet', () => {
  // TODO: Timezone while running in CI does not match local timezone, skipping for now
  test.skip('renders when no event', () => {
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
          <Offline />
        </div>   
      </Provider>
    );

    expect(wrapper.find('p')).toHaveLength(3);
    expect(wrapper.find('p').at(0).text()).toEqual('Upcoming Event');
    expect(wrapper.find('p').at(1).text()).toEqual('Church Service');
    expect(wrapper.find('p').at(2).text()).toEqual('3:00pm Wednesday, Nov. 28');
  });
});