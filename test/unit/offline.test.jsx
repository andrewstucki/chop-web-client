// @flow
import React from 'react';
import Offline from '../../src/pane/content/offline';
import { defaultState } from '../../src/feed/dux';
import { mockDate, renderWithReduxAndTheme } from '../testUtils';

describe('Offline Componenet', () => {
  mockDate(1546896104521);
  test('renders when no event', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Offline/>,
      {
        feed: {
          ...defaultState,
          schedule: [
            {
              endTime: 1543439700,
              fetchTime: 1543437972,
              id: '132487',
              scheduleTime: 1543438800,
              startTime: 1543438200,
              title: 'Church Service',
            },
          ],
        },
      }
    );

    expect(getByTestId('offline')).toBeTruthy();
    expect(getByTestId('offline-header').textContent).toEqual('Upcoming Event');
    expect(getByTestId('offline-name').textContent).toEqual('Church Service');
    // GitLab CI runs this test in a different timezone ???
    expect(getByTestId('offline-time').textContent).toBeOneOf(['3:21pm Monday, Jan. 7', '9:21pm Monday, Jan. 7']);
  });

  test('notifies of no upcoming event', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Offline/>,
      {
        feed: {
          ...defaultState,
          schedule: [],
        },
      }
    );

    expect(getByTestId('offline')).toBeTruthy();
    expect(getByTestId('offline-noevent').textContent).toEqual('No upcoming Event.');
  });
});
