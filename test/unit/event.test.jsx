// @flow
import Event from '../../src/pane/content/event';
import { defaultState as defaultFeedState } from '../../src/feed/dux';
import React from 'react';
import { renderWithReduxAndTheme, mockDate } from '../testUtils';

mockDate('Wed Nov 28 2018 21:00:00 GMT-0000');

test('Event renders when there is an event.', () => {
  const state =
    {
      feed: {
        ...defaultFeedState,
        panes: {
          primary: {
            type: 'EVENT',
            content: {
              channelId: 'event',
            },
          },
        },
      },
      event: {
        title: 'Mastermind',
        id: 129073,
        startTime: 1543585500,
        videoStartTime: 1543586400,
        enabledFeatures: {
          chat: true,
        },
      },
    };

  const { getByTestId } = renderWithReduxAndTheme(<Event />, state);

  expect(getByTestId('chat')).toBeTruthy();
});
