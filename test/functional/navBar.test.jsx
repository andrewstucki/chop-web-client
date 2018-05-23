// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import NavBar from '../../src/navBar/navBar';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

describe('NavBar tests', () => {
  test('NavBar renders', () => {
    const wrapper = Enzyme.shallow(
      <NavBar
        channels={[
          {channel: 'Default', isCurrent: true},
          {channel: 'Host', isCurrent: false},
        ]}
        onClick={function () {}}
        openMenu={() => {}}
      />
    );
    expect(wrapper.find('.navBar').type()).toEqual('div');
  });

  test('has default channel and host channels', () => {
    const wrapper = Enzyme.shallow(
      <NavBar
        channels={[
          {channel: 'Default', isCurrent: true},
          {channel: 'Host', isCurrent: false},
        ]}
        onClick={function () {}}
        openMenu={() => {}}
      />
    );
    expect(wrapper.find('.navBar>a').length).toBe(3);
    expect(wrapper.find('.navBar>a').at(1).text()).toBe('Default');
    expect(wrapper.find('.navBar>a').at(2).text()).toBe('Host');
  });

  test('onClick function works', () => {
    const onClick = sinon.spy();
    const wrapper = Enzyme.shallow(
      <NavBar
        channels={[
          {channel: 'Default', isCurrent: true},
          {channel: 'Host', isCurrent: false},
        ]}
        onClick={onClick}
        openMenu={() => {}}
      />
    );
    wrapper.find('.navBar>a').at(1).simulate('click', {target: {value: 'Default'}});
    expect(onClick.calledOnce).toEqual(true);
    expect(onClick.getCall(0).args[0].target.value).toEqual('Default');
  });

  test('onClick updates className', () => {
    const wrapper = Enzyme.shallow(
      <NavBar
        channels={[
          {channel: 'Default', isCurrent: true},
          {channel: 'Host', isCurrent: false},
        ]}
        onClick={function () {}}
        openMenu={() => {}}
      />
    );
    expect(wrapper.find('.navBar>a').at(1).props().className).toBe('selected');
    expect(wrapper.find('.navBar>a').at(2).props().className).toBe('default');
  });
});
