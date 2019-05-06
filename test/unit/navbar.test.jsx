// @flow
import React from 'react';
import { act } from 'react-testing-library';

import Navbar from '../../src/navbar/navbar';
import { EVENT } from '../../src/pane/content/event/dux';
import { CHAT } from '../../src/pane/content/chat/dux';
import { renderWithTheme } from '../testUtils';

describe('Navbar tests', () => {
  test('Navbar renders', () => {
    let container = null;
    act(() => {
      container = renderWithTheme(
        <Navbar
          items={[
            {
              id: '123456',
              name: 'Public',
              isCurrent: true,
              hasActions: false,
              hasNewMessages: false,
              otherUsersNames: [],
              isDirect: false,
              isPlaceholder: false,
              type: EVENT,
            },
            {
              id: '8910111',
              name: 'Host',
              isCurrent: false,
              hasActions: false,
              hasNewMessages: false,
              otherUsersNames: [],
              isDirect: false,
              isPlaceholder: false,
              type: CHAT,
            },
          ]}
          openMenu={() => {}}
          setPaneToEvent={() => {}}
          setPaneToChat={() => {}}
          setPaneToTab={() => {}}
          setNavbarIndex={() => {}}
          navbarIndex={0}
        />
      );
    });

    expect.assertions(1);
    if (container) {
      const { getByTestId } = container;
      expect(getByTestId('navbar')).toBeTruthy();
    }
  });

  test('has default and host channels', () => {
    let container = null;
    act(() => {
      container = renderWithTheme(
        <Navbar
          items={[
            {
              id: '123456',
              name: 'Public',
              isCurrent: true,
              hasActions: false,
              hasNewMessages: false,
              otherUsersNames: [],
              isDirect: false, isPlaceholder: false,
              type: EVENT,
            },
            {
              id: '2131654',
              name: 'Host',
              isCurrent: false,
              hasActions: false,
              hasNewMessages: false,
              otherUsersNames: [],
              isDirect: false, isPlaceholder: false,
              type: CHAT,
            },
          ]}
          openMenu={() => {}}
          setPaneToEvent={() => {}}
          setPaneToChat={() => {}}
          setPaneToTab={() => {}}
          setNavbarIndex={() => {}}
          navbarIndex={0}
        />
      );
    });

    expect.assertions(3);
    if (container) {
      const { getByTestId, getByText } = container;
      const buttons = getByTestId('navbarItems').querySelectorAll('button');
      expect(buttons.length).toBe(2);
      expect(getByText('channels.public')).toBeTruthy();
      expect(getByText('channels.host')).toBeTruthy();
    }
  });

  test('displaying pip on public', () => {
    let container = null;
    act (() => {
      container = renderWithTheme(
        <Navbar
          items={[
            {
              id: '123456',
              name: 'Public',
              isCurrent: false,
              hasActions: true,
              hasNewMessages: false,
              otherUsersNames: [],
              isDirect: false, isPlaceholder: false,
              type: EVENT,
            },
            {
              id: '1346546',
              name: 'Host',
              isCurrent: true,
              hasActions: false,
              hasNewMessages: false,
              otherUsersNames: [],
              isDirect: false, isPlaceholder: false,
              type: CHAT,
            },
          ]}
          openMenu={() => {}}
          setPaneToEvent={() => {}}
          setPaneToChat={() => {}}
          setPaneToTab={() => {}}
          setNavbarIndex={() => {}}
          navbarIndex={0}
        />
      );
    });

    expect.assertions(2);
    if (container) {
      const { getByTestId } = container;
      // $FlowFixMe
      expect(getByTestId('nav-Public').querySelector('div').className).toStartWith('styles__Pip');
      expect(getByTestId('nav-Host').querySelector('div')).toBeNull();
    }
  });

  test('displaying pip on host', () => {
    let container = null;
    act (() => {
      container = renderWithTheme(
        <Navbar
          items={[
            {
              id: '123456',
              name: 'Public',
              isCurrent: false,
              hasActions: false,
              hasNewMessages: false,
              otherUsersNames: [],
              isDirect: false, isPlaceholder: false,
              type: EVENT,
            },
            {
              id: '1346546',
              name: 'Host',
              isCurrent: true,
              hasActions: true,
              hasNewMessages: false,
              otherUsersNames: [],
              isDirect: false, isPlaceholder: false,
              type: CHAT,
            },
          ]}
          openMenu={() => {}}
          setPaneToEvent={() => {}}
          setPaneToChat={() => {}}
          setPaneToTab={() => {}}
          setNavbarIndex={() => {}}
          navbarIndex={0}
        />
      );
    });

    expect.assertions(2);
    if (container) {
      const { getByTestId } = container;
      // $FlowFixMe
      expect(getByTestId('nav-Host').querySelector('div').className).toStartWith('styles__Pip');
      expect(getByTestId('nav-Public').querySelector('div')).toBeNull();
    }
  });

  test('direct chat with participants', () => {
    let container = null;
    act(() => {
      container = renderWithTheme(
        <Navbar
          items={[
            {
              id: '123456',
              name: 'Public',
              isCurrent: true,
              hasActions: false,
              hasNewMessages: false,
              otherUsersNames: [],
              isDirect: false, isPlaceholder: false,
              type: EVENT,
            },
            {
              id: '8910111',
              name: 'Host',
              isCurrent: false,
              hasActions: false,
              hasNewMessages: false,
              otherUsersNames: [],
              isDirect: false, isPlaceholder: false,
              type: CHAT,
            },
            {
              id: '3513513',
              name: 'direct1',
              isCurrent: false,
              hasActions: false,
              hasNewMessages: true,
              otherUsersNames: ['bob'],
              isDirect: true,
              isPlaceholder: false,
              type: CHAT,
            },
          ]}
          openMenu={() => {}}
          setPaneToEvent={() => {}}
          setPaneToChat={() => {}}
          setPaneToTab={() => {}}
          setNavbarIndex={() => {}}
          navbarIndex={0}
        />
      );
    });

    expect.assertions(3);
    if (container) {
      const { getByTestId } = container;
      expect(getByTestId('nav-direct1')).toBeTruthy();
      expect(getByTestId('nav-direct1').textContent).toEqual('B');
      // $FlowFixMe
      expect(getByTestId('nav-direct1').querySelector('div').className).toStartWith('styles__Pip');
    }
  });

  test('channels display in the proper order', () => {
    let container = null;
    act(() => {
      container = renderWithTheme(
        <Navbar
          items={[
            {
              id: '123456',
              name: 'Public',
              isCurrent: true,
              hasActions: false,
              hasNewMessages: false,
              otherUsersNames: [],
              isDirect: false, isPlaceholder: false,
              type: EVENT,
            },
            {
              id: '321365',
              name: 'Host',
              isCurrent: false,
              hasActions: false,
              hasNewMessages: false,
              otherUsersNames: [],
              isDirect: false, isPlaceholder: false,
              type: CHAT,
            },
            {
              id: '3513513',
              name: 'direct1',
              isCurrent: false,
              hasActions: false,
              hasNewMessages: false,
              otherUsersNames: ['bob'],
              isDirect: true,
              isPlaceholder: false,
              type: CHAT,
            },
            {
              id: '6546510',
              name: 'direct2',
              isCurrent: false,
              hasActions: false,
              hasNewMessages: false,
              otherUsersNames: ['carl'],
              isDirect: true,
              isPlaceholder: false,
              type: CHAT,
            },
          ]}
          openMenu={() => {}}
          setPaneToEvent={() => {}}
          setPaneToChat={() => {}}
          setPaneToTab={() => {}}
          setNavbarIndex={() => {}}
          navbarIndex={0}
        />
      );
    });

    expect.assertions(5);
    if (container) {
      const { getByTestId } = container;
      const buttons = getByTestId('navbarItems').querySelectorAll('button');
      expect(buttons.length).toEqual(4);
      expect(buttons[0].textContent).toEqual('channels.public');
      expect(buttons[1].textContent).toEqual('channels.host');
      expect(buttons[2].textContent).toEqual('B');
      expect(buttons[3].textContent).toEqual('C');
    }
  });
});
