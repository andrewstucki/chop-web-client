// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import 'jest-styled-components';
import Tab from '../../src/pane/content/tab';
import { HOST_INFO } from '../../src/hostInfo/dux';
import HostInfo from '../../src/hostInfo';
import { createStore } from 'redux';
import reducer from '../../src/chop/dux';
import { defaultState } from '../../src/feed/dux';
import { Provider } from 'react-redux';
import { mountWithTheme } from '../testUtils';
import ActionBanner from '../../src/components/actionBanner';

Enzyme.configure({ adapter: new Adapter() });

describe('Tab tests', () => {
  test('Tab Type renders', () => {
    const store = createStore(
      reducer,
      {
        feed: defaultState,
      }
    );

    const wrapper = mountWithTheme(
      <Provider store={store}>
        <Tab
          type={HOST_INFO}
          removeTab={() => {}}
        />
      </Provider>
    );

    expect(wrapper.find(HostInfo).exists()).toEqual(true);
  });

  test('Tab has an action banner', () => {
    const store = createStore(
      reducer,
      {
        feed: defaultState,
      }
    );

    const wrapper = mountWithTheme(
      <Provider store={store}>
        <Tab
          type={HOST_INFO}
          removeTab={() => {}}
        />
      </Provider>
    );

    expect(wrapper.find(ActionBanner).exists()).toBeTruthy();
  });
});
