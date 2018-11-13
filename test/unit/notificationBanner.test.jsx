// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { createStore } from 'redux';
import reducer from '../../src/chop/dux';
import { Provider } from 'react-redux';
import { mutedNotificationBanner, errorNotificationBanner } from '../../src/banner/dux';
import { defaultState } from '../../src/feed/dux';
import Banner from '../../src/banner';

Enzyme.configure({ adapter: new Adapter() });

describe('NotificationBanner test', () => {
  test('Mute user notification banner renders', () => {
    const store = createStore(
      reducer,
      {
        feed: {
          ...defaultState,
        },
      },
    );

    store.dispatch(
      mutedNotificationBanner('G. Boole')
    );

    const wrapper = Enzyme.mount(
      <Provider store={store}>
        <div>
          <Banner />
        </div>   
      </Provider>
    );

    expect(store.getState().feed.notificationBanner).toEqual(
      {
        message: 'G. Boole',
        bannerType: 'notification',
      },
    );
    expect(wrapper.find('div').at(1).text()).toEqual(
      'SVGG. Boole was muted.'
    );
  });

  test('Error notification banner renders', () => {
    const store = createStore(
      reducer,
      {
        feed: {
          ...defaultState,
        },
      },
    );

    store.dispatch(
      errorNotificationBanner('There was an error.')
    );

    const wrapper = Enzyme.mount(
      <Provider store={store}>
        <div>
          <Banner />
        </div>   
      </Provider>
    );

    expect(store.getState().feed.notificationBanner).toEqual(
      {
        message: 'There was an error.',
        bannerType: 'error',
      },
    );
    expect(wrapper.find('div').at(1).text()).toEqual(
      'SVGThere was an error.'
    );
  });

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

    const wrapper = Enzyme.mount(
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