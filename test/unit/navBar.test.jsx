// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import sinon from 'sinon';

import NavBar from '../../src/navBar/navBar';


Enzyme.configure({ adapter: new Adapter() });

describe('NavBar tests', () => {
  test('NavBar renders', () => {
    const wrapper = Enzyme.shallow(
      <NavBar
        channels={[
          {id: '123456', name: 'public', isCurrent: true, hasActions: false, otherUsersNames: []},
          {id: '123456', name: 'host', isCurrent: false, hasActions: false, otherUsersNames: []},
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
          {id: '123456', name: 'Public', isCurrent: true, hasActions: false, otherUsersNames: []},
          {id: '123456', name: 'Host', isCurrent: false, hasActions: false, otherUsersNames: []},
        ]}
        onClick={function () {}}
        openMenu={() => {}}
        barWidth={100}
        barX={50}
      />
    );
    expect(wrapper.find('.navBar a').length).toBe(3);
    expect(wrapper.find('.navBar a').at(1).text()).toBe('event');
    expect(wrapper.find('.navBar a').at(2).text()).toBe('Host');
  });

  test('onClick function works', () => {
    const onClick = sinon.spy();
    const wrapper = Enzyme.shallow(
      <NavBar
        channels={[
          {id: '123456', name: 'public', isCurrent: true, hasActions: false, otherUsersNames: []},
          {id: '654321', name: 'host', isCurrent: false, hasActions: false, otherUsersNames: []},
        ]}
        onClick={onClick}
        openMenu={() => {}}
        barWidth={100}
        barX={50}
      />
    );
    wrapper.find('.navBar a').at(1).simulate('click', 'public');
    expect(onClick.calledOnce).toEqual(true);
    expect(onClick.getCall(0).args[0]).toEqual('123456');
  });

  test('displaying pip on public', () => {
    const wrapper = Enzyme.shallow(
      <NavBar
        channels={[
          {id: '123456', name: 'public', isCurrent: true, hasActions: true, otherUsersNames: []},
          {id: '123456', name: 'host', isCurrent: false, hasActions: false, otherUsersNames: []},
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
          {id: '123456', name: 'public', isCurrent: true, hasActions: false, otherUsersNames: []},
          {id: '123456', name: 'host', isCurrent: false, hasActions: true, otherUsersNames: []},
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

  test('channels with other user names to store', () => {
    expect(NavBar.getDerivedStateFromProps(
      {
        channels: [
          {
            id: '123456',
            name: 'direct1',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [
              'bob',
            ],
          },
          {
            id: '12345',
            name: 'direct2',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [
              'sue',
            ],
          },
        ],
        onClick: () => {},
        openMenu: () => {},
      }, 
      {
        left: 20,
        width: 35,
        opacity: 1.0,
        directChatChannelNames: {},
      }))
      .toEqual(
        {
          left: 20,
          width: 35,
          opacity: 1.0,
          directChatChannelNames: {
            '123456': 'bob',
            '12345': 'sue',
          },
        }
      );
  });

  test('channels without other user names to be stored', () => {
    expect(NavBar.getDerivedStateFromProps(
      {
        channels: [
          {
            id: '123456',
            name: 'direct1',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [],
          },
          {
            id: '123456',
            name: 'direct2',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [],
          },
        ],
        onClick: () => {},
        openMenu: () => {},
      }, 
      {
        left: 20,
        width: 35,
        opacity: 1.0,
        directChatChannelNames: {},
      }
    )).toEqual(null);
  });

  test('channels with other user names that are already stored', () => {
    expect(NavBar.getDerivedStateFromProps(
      {
        channels: [
          {
            id: '123456',
            name: 'direct1',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [
              'bob',
            ],
          },
          {
            id: '12345',
            name: 'direct2',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [
              'sue',
            ],
          },
        ],
        onClick: () => {},
        openMenu: () => {},
      }, 
      {
        left: 20,
        width: 35,
        opacity: 1.0,
        directChatChannelNames: {
          '123456': 'bob',
          '12345': 'sue',
        },
      }
    )).toEqual(null);
  });

  test('direct chat with participants', () => {
    const wrapper = Enzyme.shallow(
      <NavBar
        channels={[
          {id: '123456', name: 'public', isCurrent: true, hasActions: false, otherUsersNames: []},
          {id: '123456', name: 'host', isCurrent: false, hasActions: false, otherUsersNames: []},
          {
            id: '123456',
            name: 'direct1',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: ['bob'],
          },
        ]}
        onClick={function () {}}
        openMenu={() => {}}
        barWidth={100}
        barX={50}
      />
    );
    expect(wrapper.find('#nav-direct1').text()).toEqual('B');
  });

  test('channels display in the proper order', () => {
    const wrapper = Enzyme.shallow(
      <NavBar
        channels={[
          {
            id: '123456',
            name: 'direct1',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: ['bob'],
          },
          {
            id: '123456',
            name: 'direct1',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: ['bill'],
          },
          {id: '123456', name: 'Public', isCurrent: true, hasActions: false, otherUsersNames: []},
          {id: '123456', name: 'Host', isCurrent: false, hasActions: false, otherUsersNames: []},
        ]}
        onClick={function () {}}
        openMenu={() => {}}
        barWidth={100}
        barX={50}
      />
    );
    expect(wrapper.find('.navBar a').length).toBe(5);
    expect(wrapper.find('.navBar a').at(1).text()).toBe('event');
    expect(wrapper.find('.navBar a').at(2).text()).toBe('Host');
  });
});
