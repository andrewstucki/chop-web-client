// @flow
import React from 'react';
import Pane from '../../src/pane';
import { renderWithReduxAndTheme, defaultState } from '../testUtils';
import { act } from '@testing-library/react';

describe('Pane', () => {
  test('It prevents two event panes from rendering on Large', () => {
    let wrapper = null;
    act(() => {
      wrapper = renderWithReduxAndTheme(
        <Pane
          name='primary'
          isLarge={true}
          isXlarge={false}
        />,
        {
          ...defaultState,
          feed: {
            ...defaultState.feed,
            channels: {
              host: {
                id: 'host',
                name: 'host',
                type: 'host',
                direct: false,
                placeholder: false,
                moments: [],
                anchorMoments: [],
                scrollPosition: 0,
                sawLastMomentAt: 1546896104521,
              },
              public: {
                id: 'public',
                name: 'public',
                type: 'public',
                direct: false,
                placeholder: false,
                moments: [],
                anchorMoments: [],
                scrollPosition: 0,
                sawLastMomentAt: 1546896104521,
              },
            },
            panes: {
              primary: {
                type: 'EVENT',
                content: {
                  channelId: 'public',
                },
              },
            },
            navbarIndex: 0,
            prevNavbarIndex: 0,
          },
        });
    });

    expect.assertions(2);
    if (wrapper) {
      expect(wrapper.findByTestId('pane')).toBeTruthy();
      expect(wrapper.store.getState().feed.panes.primary).toEqual({
        content: {
          animate: true,
          channelId: 'host',
        },
        type: 'CHAT',
      });
    }
  });

  test('It prevents two event or host panes from rendering on Xlarge', () => {
    let wrapper = null;
    act(() => {
      wrapper = renderWithReduxAndTheme(
        <Pane
          name='primary'
          isLarge={false}
          isXlarge={true}
        />,
        {
          ...defaultState,
          feed: {
            ...defaultState.feed,
            channels: {
              host: {
                id: 'host',
                name: 'host',
                type: 'host',
                direct: false,
                placeholder: false,
                moments: [],
                anchorMoments: [],
                scrollPosition: 0,
                sawLastMomentAt: 1546896104521,
              },
              public: {
                id: 'public',
                name: 'public',
                type: 'public',
                direct: false,
                placeholder: false,
                moments: [],
                anchorMoments: [],
                scrollPosition: 0,
                sawLastMomentAt: 1546896104521,
              },
            },
            panes: {
              primary: {
                type: 'EVENT',
                content: {
                  channelId: 'public',
                },
              },
            },
            navbarIndex: 0,
            prevNavbarIndex: 0,
          },
        });
    });

    expect.assertions(2);
    if (wrapper) {
      expect(wrapper.findByTestId('pane')).toBeTruthy();
      expect(wrapper.store.getState().feed.panes.primary).toEqual({
        content: {
          type: 'HOST_INFO',
        },
        type: 'TAB',
      });
    }
  });
});
