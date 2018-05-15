// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import NavBar from '../../src/navBar/navBar';

Enzyme.configure({ adapter: new Adapter() });

describe('NavBar tests', () => {
  test('has a default channel', () => {
    const wrapper = Enzyme.shallow(
      <NavBar />
    );
    expect(wrapper.find('.navBar').children().length).toBe(1);
    expect(wrapper.find('.channels').children().length).toBe(1);
    expect(wrapper.find('.navBar').childAt(0).type()).toEqual('div');
    expect(wrapper.find('.channels').childAt(0).type()).toEqual('a');
  });
});
