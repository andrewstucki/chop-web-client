// @flow
import React from 'react';
import sinon from 'sinon';
import { defaultState } from '../../src/chop/dux';
import Navbar from '../../src/navbar/navbar';
import NavbarIndex from '../../src/navbar';
import { act, fireEvent } from '@testing-library/react';
import { EVENT } from '../../src/pane/content/event/dux';
import { CHAT } from '../../src/pane/content/chat/dux';
import { renderWithTheme, renderWithReduxAndTheme } from '../testUtils';
import { PRIMARY_PANE } from '../../src/pane/dux';

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
              otherSubscribersNames: [],
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
              otherSubscribersNames: [],
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
              otherSubscribersNames: [],
              isDirect: false,
              isPlaceholder: false,
              type: EVENT,
            },
            {
              id: '2131654',
              name: 'Host',
              isCurrent: false,
              hasActions: false,
              hasNewMessages: false,

              otherSubscribersNames: [],
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

    expect.assertions(3);
    if (container) {
      const { getByTestId, getByText } = container;
      const buttons = getByTestId('navbar').querySelectorAll('button');
      expect(buttons.length).toBe(2);
      expect(getByText('public')).toBeTruthy();
      expect(getByText('host')).toBeTruthy();
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
              hasNewMessages: true,
              otherSubscribersNames: [],
              isDirect: false,
              isPlaceholder: false,
              type: EVENT,
            },
            {
              id: '1346546',
              name: 'Host',
              isCurrent: true,
              hasActions: false,
              hasNewMessages: false,
              otherSubscribersNames: [],
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

    expect.assertions(2);
    if (container) {
      const { getByTestId } = container;
      expect(getByTestId('nav-Public').querySelector('div').className).toStartWith('styles__Pip');
      expect(getByTestId('nav-Host').querySelector('div')).toBeNull();
    }
  });

  test('not displaying pip on public', () => {
    let container = null;
    act (() => {
      container = renderWithReduxAndTheme(
        <NavbarIndex />,
        {
          ...defaultState,
          subscriber: {
            ...defaultState.subscriber,
            currentSubscriber: {
              ...defaultState.subscriber.currentSubscriber,
              id: '456',
            },
          },
          feed: {
            ...defaultState.feed,
            channels: {
              '123456': {
                name: 'Public',
                type: 'public',
                direct: false,
                id: '123456',
                sawLastMomentAt: 1558450899,
                moments: [
                  {
                    type: 'MESSAGE',
                    id: '123',
                    timestamp: 1558537299,
                    text: 'Hi',
                    subscriber: {
                      id: '123',
                    },
                  },
                ],
              },
              '789123': {
                name: 'Host',
                type: 'host',
                direct: false,
                id: '789123',
                sawLastMomentAt: 1558533699,
                moments: [
                  {
                    type: 'MESSAGE',
                    id: '123',
                    timestamp: 1558537299,
                    text: 'Hi',
                    subscriber: {
                      id: '123',
                    },
                  },
                ],
              },
            },
          },
        }
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
              otherSubscribersNames: [],
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
              otherSubscribersNames: [],
              isDirect: false,
              isPlaceholder: false,
              type: CHAT,
            },
            {
              id: '3513513',
              name: 'direct1',
              isCurrent: false,
              hasActions: false,
              hasNewMessages: true,
              otherSubscribersNames: ['bob'],
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

  test('direct chat with subscribers', () => {
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
              otherSubscribersNames: [],
              isDirect: false,
              isPlaceholder: false,
              type: EVENT,
            },
            {
              id: '321365',
              name: 'Host',
              isCurrent: false,
              hasActions: false,
              hasNewMessages: false,
              otherSubscribersNames: [],
              isDirect: false,
              isPlaceholder: false,
              type: CHAT,
            },
            {
              id: '3513513',
              name: 'direct1',
              isCurrent: false,
              hasActions: false,
              hasNewMessages: true,
              otherSubscribersNames: ['bob'],
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
              otherSubscribersNames: ['carl'],
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
      const buttons = getByTestId('navbar').querySelectorAll('button');
      expect(buttons.length).toEqual(4);
      expect(buttons[0].textContent).toEqual('public');
      expect(buttons[1].textContent).toEqual('host');
      expect(buttons[2].textContent).toEqual('B');
      expect(buttons[3].textContent).toEqual('C');
    }
  });

  test('Clicking event takes you to the event', () => {
    let container = null;
    const setPaneToEvent = sinon.spy();
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
              otherSubscribersNames: [],
              isDirect: false,
              isPlaceholder: false,
              type: EVENT,
            },
          ]}
          openMenu={() => {}}
          setPaneToEvent={setPaneToEvent}
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
      const buttons = getByTestId('navbar').querySelectorAll('button');
      fireEvent.click(buttons[0]);
      expect(setPaneToEvent.calledOnce).toBeTrue();
      expect(setPaneToEvent.calledWith(PRIMARY_PANE, '123456')).toBeTrue();
    }
  });

  test('Clicking chat takes you to the chat', () => {
    let container = null;
    const setNavbarIndex = sinon.spy();
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
              otherSubscribersNames: [],
              isDirect: false,
              isPlaceholder: false,
              type: EVENT,
            },
            {
              id: '321365',
              name: 'Host',
              isCurrent: false,
              hasActions: false,
              hasNewMessages: false,
              otherSubscribersNames: [],
              isDirect: false,
              isPlaceholder: false,
              type: CHAT,
            },
            {
              id: '3513513',
              name: 'direct1',
              isCurrent: false,
              hasActions: false,
              hasNewMessages: false,
              otherSubscribersNames: ['bob'],
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
              otherSubscribersNames: ['carl'],
              isDirect: true,
              isPlaceholder: false,
              type: CHAT,
            },
          ]}
          openMenu={() => {}}
          setPaneToEvent={() => {}}
          setPaneToChat={() => {}}
          setPaneToTab={() => {}}
          setNavbarIndex={setNavbarIndex}
          navbarIndex={0}
        />
      );
    });

    expect.assertions(2);
    if (container) {
      const { getByTestId } = container;
      const buttons = getByTestId('navbar').querySelectorAll('button');
      fireEvent.click(buttons[3]);
      expect(setNavbarIndex.calledOnce).toBeTrue();
      expect(setNavbarIndex.calledWith(3)).toBeTrue();
    }
  });
});
