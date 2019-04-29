// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { createStore } from 'redux';
import reducer from '../../src/chop/dux';
import { Provider } from 'react-redux';
import { defaultState } from '../../src/feed/dux';
import Banner from '../../src/banner';
import { mountWithTheme } from '../testUtils';

Enzyme.configure({ adapter: new Adapter() });

describe('NotificationBanner test', () => {
  test('Notification banner is removed on dismiss', () => {
    const store = createStore(
      reducer,
      {
        feed: {
          ...defaultState,
          notificationBanner: {
            message: 'G. Boole',
            bannerType: 'notification',
          },
        },
      },
    );

    const wrapper = mountWithTheme(
      <Provider store={store}>
        <div>
          <Banner />
        </div>
      </Provider>
    );
    wrapper.find('button').first().simulate('click');
    expect(store.getState().feed.notificationBanner).toEqual(
      {
        message: '',
        bannerType: '',
      },
    );
  });
});
