// @flow
import { createStore } from 'redux';
import reducer from '../../src/chop/dux';
import { defaultState } from '../../src/feed/dux';
import { setPaneToTab, TAB } from '../../src/pane/content/tab/dux';
import { HOST_INFO } from '../../src/hostInfo/dux';
import { mockDate } from '../testUtils';

describe('Tab tests', () => {
  test('Pane can be set to tab', () => {
    mockDate(1546896104521);
    const store = createStore(
      reducer,
      {
        feed: {
          ...defaultState,
          panes: {
            primary: {
              type: 'CHAT',
              content: {
                channelId: 'Public',
              },
            },
          },
        },
      }
    );

    store.dispatch(
      setPaneToTab('primary', HOST_INFO)
    );

    const { lastAction, ...result } = store.getState().feed; // eslint-disable-line no-unused-vars

    expect(result).toEqual(
      {
        ...defaultState,
        channels: {
          Public: {
            sawLastMomentAt: 1546896104521,
          },
        },
        panes: {
          primary: {
            type: TAB,
            content: {
              type: HOST_INFO,
            },
          },
        },
      }
    );
  });
});
