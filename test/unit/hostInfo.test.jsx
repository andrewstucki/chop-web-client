// @flow
import React from 'react';
import HostInfo from '../../src/hostInfo';
import { renderWithReduxAndTheme } from '../testUtils';
import { defaultState as defaultEventState } from '../../src/event/dux';
import { defaultState as defaultFeedState } from '../../src/feed/dux';
import { defaultState as defaultScheduleState } from '../../src/schedule/dux';

describe('Host Info tests', () => {
  test('Gets it from the event when there is an active event.', () => {
    const state =
      {
        event: {
          ...defaultEventState,
          title: 'Event',
          id: '123',
          eventTimeId: '0',
          startTime: 0,
          hostInfo: '<p>The information for the hosts.</p>',
        },
      };

    const { getByTestId } = renderWithReduxAndTheme(<HostInfo />, state);
    expect(getByTestId('hostInfo').textContent).toEqual('The information for the hosts.');
  });

  test('Gets it from the schedule when there is not an active event.', () => {
    const state = {
      schedule: {
        items: [
          {
            id: '1',
            startTime: 0,
            endTime: 0,
            title: 'Next Event',
            hostInfo: '<p>The information for the hosts.</p>',
          },
        ],
        timeZone: '',
      },
      event: defaultEventState,
      feed: defaultFeedState,
    };

    const { getByTestId } = renderWithReduxAndTheme(<HostInfo />, state);
    expect(getByTestId('hostInfo').textContent).toEqual('The information for the hosts.');
  });

  test('Renders empty state.', () => {
    const state = {
      feed: defaultFeedState,
      schedule: defaultScheduleState,
      sequence: {
        serverTime: 0,
        steps: [],
      },
    };

    const { getByTestId, queryByTestId } = renderWithReduxAndTheme(<HostInfo />, state);
    expect(queryByTestId('hostInfo')).toBeFalsy();
    expect(getByTestId('hostInfo-empty')).toBeTruthy();
    expect(getByTestId('hostInfo-empty').textContent).toEqual('host_info_empty');
  });
});
