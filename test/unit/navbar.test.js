// @flow
import { createStore } from 'redux';
import reducer, { defaultState } from '../../src/chop/dux';
import { CHAT } from '../../src/pane/content/chat/dux';
import {
  setNavbarIndex,
  getHostChannel,
  getPublicChannel,
} from '../../src/navbar/dux';
import { newMessage } from '../../src/moment/message/dux';
import { COMPACT } from '../../src/textModeToggle/dux';

describe('NavBar tests', () => {
  test('Navbar index is updated', () => {
    const store = createStore(
      reducer,
      defaultState
    );

    store.dispatch(
      setNavbarIndex(2)
    );

    const { feed: { lastAction: _lastAction, ...result }} = store.getState();

    expect(result).toEqual(
      {
        ...defaultState.feed,
        navbarIndex: 2,
        prevNavbarIndex: 0,
      }
    );
  });

  test('get host channel', () => {
    const store = createStore(
      reducer,
      {
        ...defaultState,
        feed: {
          ...defaultState.feed,
          panes: {
            primary: {
              content: {
                channelId: 'abc',
              },
            },
          },
          channels: {
            abc: {
              name: 'Host',
              id: 'abc',
              type: 'host',
              moments: [],
              direct: false,
              placeholder: false,
            },
            xyz: {
              name: 'Public',
              type: 'public',
              id: 'xyz',
              moments: [],
              direct: false,
              placeholder: false,
            },
          },
        },
      }
    );

    const result = getHostChannel(store.getState());

    expect(result).toEqual(
      {
        name: 'Host',
        id: 'abc',
        isCurrent: true,
        hasActions: false,
        hasNewMessages: false,
        otherUsersNames: [],
        isDirect: false,
        isPlaceholder: false,
        type: CHAT,
      }
    );
  });

  test('Get Public Channel (not default)', () => {
    const subscriber = {
      id: 128,
      name: 'Joe',
      avatar: null,
      pubnubToken: '6789',
      pubnubAccessKey: '1234',
      role: {
        label: '',
        permissions: [],
      },
      preferences: {
        textMode: COMPACT,
      },
    };
    const otherGuy = {
      id: 512,
      name: 'Bob',
      avatar: null,
      pubnubToken: '0987',
      role: {
        label: '',
      },
    };
    const publicChannel = getPublicChannel(
      {
        ...defaultState,
        feed: {
          ...defaultState.feed,
          panes: {
            primary: {
              content: {
                channelId: 'abc',
              },
            },
          },
          channels: {
            abc: {
              name: 'Host',
              id: 'abc',
              type: 'host',
              moments: [],
              direct: false,
              placeholder: false,
            },
            xyz: {
              name: 'Public',
              type: 'public',
              id: 'xyz',
              moments: [
                newMessage('Hello', otherGuy, 'en'),
              ],
              direct: false,
              placeholder: false,
            },
          },
        },
        user: {
          ...defaultState.user,
          currentUser: subscriber,
        },
      } 
    );

    expect(publicChannel).toEqual(
      {
        hasActions: false,
        hasNewMessages: false,
        id: 'xyz',
        isCurrent: false,
        isDirect: false,
        isPlaceholder: false,
        name: 'Public',
        otherUsersNames: [],
        type: 'EVENT',
      }
    );
  });
});
