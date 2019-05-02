// @flow
import { createStore } from 'redux';
import reducer from '../../src/chop/dux';
import { defaultState } from '../../src/feed/dux';
import { CHAT } from '../../src/pane/content/chat/dux';
import {
  setNavbarIndex,
  getHostChannel,
} from '../../src/navbar/dux';

describe('NavBar tests', () => {
  test('Navbar index is updated', () => {
    const store = createStore(
      reducer,
      {
        feed: defaultState,
      }
    );

    store.dispatch(
      setNavbarIndex(2)
    );

    const { lastAction, ...result } = store.getState().feed; // eslint-disable-line no-unused-vars

    expect(result).toEqual(
      {
        ...defaultState,
        navbarIndex: 2,
        prevNavbarIndex: 0,
      }
    );
  });

  test('get host channel', () => {
    const store = createStore(
      reducer,
      {
        feed: {
          ...defaultState,
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
              moments: [],
              direct: false,
              placeholder: false,
            },
            xyz: {
              name: 'Public',
              id: 'xyz',
              moments: [],
              direct: false,
              placeholder: false,
            },
          },
        },
      }
    );

    const result = getHostChannel(store.getState().feed);

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
});
