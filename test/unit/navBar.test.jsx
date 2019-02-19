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
            id: '8910111',
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
    const wrapper = Enzyme.mount(
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
            id: '2131654',
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
    expect(wrapper.find('Actionable').length).toBe(3);
    expect(wrapper.find('Actionable').at(1).text()).toBe('Public');
    expect(wrapper.find('Actionable').at(2).text()).toBe('Host');
  });

  test('displaying pip on public', () => {
    const wrapper = Enzyme.mount(
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
            id: '1346546',
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
    expect(wrapper.find('#nav-Public').find('styles__Pip').length).toBe(1);
    expect(wrapper.find('#nav-Host').find('styles__Pip').length).toBe(0);
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
            id: '146546',
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
    expect(wrapper.find('#nav-Public').find('styles__Pip').length).toBe(0);
    expect(wrapper.find('#nav-Host').find('styles__Pip').length).toBe(1);
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
            id: '5654651',
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
            id: '1321510',
            name: 'Hose',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [],
            isDirect: false,
            type: CHAT,
          },
          {
            id: '221351',
            name: 'direct1',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [],
            isDirect: true,
            type: CHAT,
          },
          {
            id: '365133',
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
            id: '654651',
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
    const wrapper = Enzyme.mount(
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
            id: '532321',
            name: 'host',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [],
            isDirect: false,
            type: CHAT,
          },
          {
            id: '36542',
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
    expect(wrapper.find('Actionable').at(3).text()).toEqual('B');
  });

  test('channels display in the proper order', () => {
    const wrapper = Enzyme.mount(
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
            id: '321365',
            name: 'Host',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: [],
            isDirect: false,
            type: CHAT,
          },
          {
            id: '3513513',
            name: 'direct1',
            isCurrent: false,
            hasActions: false,
            otherUsersNames: ['bob'],
            isDirect: true,
            type: CHAT,
          },
          {
            id: '6546510',
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
    expect(wrapper.find('Actionable').length).toBe(5);
    expect(wrapper.find('Actionable').at(1).text()).toBe('Public');
    expect(wrapper.find('Actionable').at(2).text()).toBe('Host');
  });
});
