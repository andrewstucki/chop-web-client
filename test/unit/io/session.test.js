// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../../src/chop/dux';
import SideMenu from '../../../src/sideMenu';

Enzyme.configure({ adapter: new Adapter() });

describe('Session', () => {
  test('logout', () => {
    global.location.assign = jest.fn();

    const store = createStore(reducer);

    const wrapper = Enzyme.mount(
      <Provider store={store}>
        <SideMenu />
      </Provider>
    );

    wrapper.find('#logout').simulate('click');
    expect(global.location.assign).toHaveBeenCalledTimes(1);
    expect(global.location.assign).toHaveBeenCalledWith('https://live.life.church/sessions/sign_out');
  });
});