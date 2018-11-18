import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../../src/chop/dux';
import SideMenu from '../../../src/sideMenu';
import '../../../src/io/location';

jest.mock('../../../src/io/graphQL');
jest.mock('../../../src/io/location');

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
