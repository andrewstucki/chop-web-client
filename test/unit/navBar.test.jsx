// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';

import NavBar from '../../src/navBar/navBar';
import {EVENT} from '../../src/pane/content/event/dux';
import {CHAT} from '../../src/pane/content/chat/dux';


Enzyme.configure({ adapter: new Adapter() });

describe('NavBar tests', () => {
  test('NavBar renders', () => {
    const wrapper = Enzyme.shallow(
      <NavBar
        items={[
          {
            id: '123456',
            name: 'Public',
            isCurrent: true,
            hasActions: false,
            otherUsersNames: [],
            isDirect: false,
            type: EVENT,
          },
          {
            id: '123456',
            name: 'Host',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [],
            isDirect: false,
            type: CHAT,
          },
        ]}
        onClick={function () {}}
        setNavbarIndex={() => {}}
        setPaneToChat={() => {}}
        setPaneToTab={() => {}}
        setPaneToEvent={() => {}}
        openMenu={() => {}}
        barWidth={100}
        barX={50}
        navbarIndex={0}
      />
    );
    expect(wrapper.find('.navBar').type()).toEqual('div');
  });

  test('has default channel and host channels', () => {
    const wrapper = Enzyme.shallow(
      <NavBar
        items={[
          {
            id: '123456',
            name: 'Public',
            isCurrent: true,
            hasActions: false,
            otherUsersNames: [],
            isDirect: false,
            type: EVENT,
          },
          {
            id: '123456',
            name: 'Host',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [],
            isDirect: false,
            type: CHAT,
          },
        ]}
        onClick={function () {}}
        setNavbarIndex={() => {}}
        setPaneToChat={() => {}}
        setPaneToTab={() => {}}
        setPaneToEvent={() => {}}
        openMenu={() => {}}
        barWidth={100}
        barX={50}
        navbarIndex={0}
      />
    );
    expect(wrapper.find('.navBar a').length).toBe(3);
    expect(wrapper.find('.navBar a').at(1).text()).toBe('Public');
    expect(wrapper.find('.navBar a').at(2).text()).toBe('Host');
  });

  test('displaying pip on public', () => {
    const wrapper = Enzyme.shallow(
      <NavBar
        items={[
          {
            id: '123456',
            name: 'Public',
            isCurrent: false,
            hasActions: true,
            otherUsersNames: [],
            isDirect: false,
            type: EVENT,
          },
          {
            id: '123456',
            name: 'Host',
            isCurrent: true,
            hasActions: false,
            otherUsersNames: [],
            isDirect: false,
            type: CHAT,
          },
        ]}
        onClick={function () {}}
        setNavbarIndex={() => {}}
        setPaneToChat={() => {}}
        setPaneToTab={() => {}}
        setPaneToEvent={() => {}}
        openMenu={() => {}}
        barWidth={100}
        barX={50}
        navbarIndex={0}
      />
    );
    expect(wrapper.find('#nav-Public span.pip').length).toBe(1);
    expect(wrapper.find('#nav-Host span.pip').length).toBe(0);
  });

  test('displaying pip on host', () => {
    const wrapper = Enzyme.shallow(
      <NavBar
        items={[
          {
            id: '123456',
            name: 'Public',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [],
            isDirect: false,
            type: EVENT,
          },
          {
            id: '123456',
            name: 'Host',
            isCurrent: false,
            hasActions: true,
            otherUsersNames: [],
            isDirect: false,
            type: CHAT,
          },
        ]}
        onClick={function () {}}
        setNavbarIndex={() => {}}
        setPaneToChat={() => {}}
        setPaneToTab={() => {}}
        setPaneToEvent={() => {}}
        openMenu={() => {}}
        barWidth={100}
        barX={50}
        navbarIndex={0}
      />
    );
    expect(wrapper.find('#nav-Public span.pip').length).toBe(0);
    expect(wrapper.find('#nav-Host span.pip').length).toBe(1);
  });

  test('channels with other user names to store', () => {
    expect(NavBar.getDerivedStateFromProps(
      {
        items: [
          {
            id: '123456',
            name: 'Public',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [],
            isDirect: false,
            type: EVENT,
          },
          {
            id: '123456',
            name: 'Hose',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [],
            isDirect: false,
            type: CHAT,
          },
          {
            id: '123456',
            name: 'direct1',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [
              'bob',
            ],
            isDirect: true,
            type: CHAT,
          },
          {
            id: '12345',
            name: 'direct2',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [
              'sue',
            ],
            isDirect: true,
            type: CHAT,
          },
        ],
        onClick: () => {},
        setNavbarIndex: () => {},
        setPaneToChat: () => {},
        setPaneToTab: () => {},
        setPaneToEvent: () => {},
        openMenu: () => {},
        navbarIndex: 0,
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
        items: [
          {
            id: '123456',
            name: 'Public',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [],
            isDirect: false,
            type: EVENT,
          },
          {
            id: '123456',
            name: 'Hose',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [],
            isDirect: false,
            type: CHAT,
          },
          {
            id: '123456',
            name: 'direct1',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [],
            isDirect: true,
            type: CHAT,
          },
          {
            id: '12345',
            name: 'direct2',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [],
            isDirect: true,
            type: CHAT,
          },
        ],
        onClick: () => {},
        setNavbarIndex: () => {},
        setPaneToChat: () => {},
        setPaneToTab: () => {},
        setPaneToEvent: () => {},
        openMenu: () => {},
        navbarIndex: 0,
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
        items: [
          {
            id: '123456',
            name: 'Public',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [],
            isDirect: false,
            type: EVENT,
          },
          {
            id: '123456',
            name: 'Hose',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [],
            isDirect: false,
            type: CHAT,
          },
          {
            id: '123456',
            name: 'direct1',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [
              'bob',
            ],
            isDirect: true,
            type: CHAT,
          },
          {
            id: '12345',
            name: 'direct2',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [
              'sue',
            ],
            isDirect: true,
            type: CHAT,
          },
        ],
        onClick: () => {},
        setNavbarIndex: () => {},
        setPaneToChat: () => {},
        setPaneToTab: () => {},
        setPaneToEvent: () => {},
        openMenu: () => {},
        navbarIndex: 0,
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
        items={[
          {
            id: '123456',
            name: 'public',
            isCurrent: true,
            hasActions: false,
            otherUsersNames: [],
            isDirect: false,
            type: EVENT,
          },
          {
            id: '123456',
            name: 'host',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [],
            isDirect: false,
            type: CHAT,
          },
          {
            id: '123456',
            name: 'direct1',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: ['bob'],
            isDirect: true,
            type: CHAT,
          },
        ]}
        onClick={function () {}}
        setNavbarIndex={() => {}}
        setPaneToChat={() => {}}
        setPaneToTab={() => {}}
        setPaneToEvent={() => {}}
        openMenu={() => {}}
        barWidth={100}
        barX={50}
        navbarIndex={0}
      />
    );
    expect(wrapper.find('#nav-direct1').text()).toEqual('B');
  });

  test('channels display in the proper order', () => {
    const wrapper = Enzyme.shallow(
      <NavBar
        items={[
          {
            id: '123456',
            name: 'Public',
            isCurrent: true,
            hasActions: false,
            otherUsersNames: [],
            isDirect: false,
            type: EVENT,
          },
          {
            id: '123456',
            name: 'Host',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [],
            isDirect: false,
            type: CHAT,
          },
          {
            id: '123456',
            name: 'direct1',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: ['bob'],
            isDirect: true,
            type: CHAT,
          },
          {
            id: '123456',
            name: 'direct1',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: ['bill'],
            isDirect: true,
            type: CHAT,
          },
        ]}
        onClick={function () {}}
        setNavbarIndex={() => {}}
        setPaneToChat={() => {}}
        setPaneToTab={() => {}}
        setPaneToEvent={() => {}}
        openMenu={() => {}}
        barWidth={100}
        barX={50}
        navbarIndex={0}
      />
    );
    expect(wrapper.find('.navBar a').length).toBe(5);
    expect(wrapper.find('.navBar a').at(1).text()).toBe('Public');
    expect(wrapper.find('.navBar a').at(2).text()).toBe('Host');
  });
});
