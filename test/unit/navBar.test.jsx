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
          {id: 'public', isCurrent: true, hasActions: false},
          {id: 'host', isCurrent: false, hasActions: false},
        ]}
        onClick={function () {}}
        openMenu={() => {}}
        barWidth={100}
        barX={50}
      />
    );
    expect(wrapper.find('.navBar').type()).toEqual('div');
  });

  test('has default channel and host channels', () => {
    const wrapper = Enzyme.shallow(
      <NavBar
        channels={[
          {id: 'public', isCurrent: true, hasActions: false},
          {id: 'host', isCurrent: false, hasActions: false},
        ]}
        onClick={function () {}}
        openMenu={() => {}}
        barWidth={100}
        barX={50}
      />
    );
    expect(wrapper.find('.navBar>a').length).toBe(3);
    expect(wrapper.find('.navBar>a').at(1).text()).toBe('event');
    expect(wrapper.find('.navBar>a').at(2).text()).toBe('host');
  });

  test('onClick function works', () => {
    const onClick = sinon.spy();
    const wrapper = Enzyme.shallow(
      <NavBar
        channels={[
          {id: 'public', isCurrent: true, hasActions: false},
          {id: 'host', isCurrent: false, hasActions: false},
        ]}
        onClick={onClick}
        openMenu={() => {}}
        barWidth={100}
        barX={50}
      />
    );
    wrapper.find('.navBar>a').at(1).simulate('click', 'public');
    expect(onClick.calledOnce).toEqual(true);
    expect(onClick.getCall(0).args[0]).toEqual('public');
  });

  test('displaying pip on public', () => {
    const wrapper = Enzyme.shallow(
      <NavBar
        channels={[
          {id: 'public', isCurrent: true, hasActions: true},
          {id: 'host', isCurrent: false, hasActions: false},
        ]}
        onClick={function () {}}
        openMenu={() => {}}
        barWidth={100}
        barX={50}
      />
    );
    expect(wrapper.find('#nav-public span.pip').length).toBe(1);
    expect(wrapper.find('#nav-host span.pip').length).toBe(0);
  });

  test('displaying pip on host', () => {
    const wrapper = Enzyme.shallow(
      <NavBar
        channels={[
          {id: 'public', isCurrent: true, hasActions: false},
          {id: 'host', isCurrent: false, hasActions: true},
        ]}
        onClick={function () {}}
        openMenu={() => {}}
        barWidth={100}
        barX={50}
      />
    );
    expect(wrapper.find('#nav-public span.pip').length).toBe(0);
    expect(wrapper.find('#nav-host span.pip').length).toBe(1);
  });
});
