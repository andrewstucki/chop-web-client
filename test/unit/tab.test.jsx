// @flow
import React from 'react';
import 'jest-styled-components';
import Tab from '../../src/pane/content/tab';
import { HOST_INFO } from '../../src/hostInfo/dux';
import { renderWithReduxAndTheme } from '../testUtils';
import { SCHEDULE } from '../../src/schedule/dux';
import { EVENT_NOTES } from '../../src/eventNotes/dux';
import { BIBLE } from '../../src/pane/content/tab/dux';

describe('Tab tests', () => {
  test('Tab Type renders', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Tab
        type={HOST_INFO}
      />,
      {
        event: {
          title: 'Event',
          id: 123,
          eventTimeId: 0,
          startTime: 0,
          hostInfo: '<p>The information for the hosts.</p>',
        },
      }
    );

    expect(getByTestId('hostInfo')).toBeTruthy();
  });

  test('Tab has an action banner on small devices', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Tab
        type={HOST_INFO}
      />,
      {
        event: {
          title: 'Event',
          id: 123,
          eventTimeId: 0,
          startTime: 0,
          hostInfo: '<p>The information for the hosts.</p>',
        },
      }
    );

    expect(getByTestId('tabHeader')).toBeTruthy();
  });

  test('SCHEDULE type renders Schedule', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Tab
        type={SCHEDULE}
      />,
      {
        schedule: {
          items: [
            {
              endTime: 1558184400,
              fetchTime: 1558097749,
              hostInfo: '',
              id: '132944',
              scheduleTime: 1558098000,
              startTime: 1558098000,
              title: 'Staging Event 24/7',
            },
            {
              endTime: 1558270800,
              fetchTime: 1558184189,
              hostInfo: '',
              id: '132944',
              scheduleTime: 1558184400,
              startTime: 1558184400,
              title: 'Staging Event 24/7',
            },
            {
              endTime: 1558357200,
              fetchTime: 1558270689,
              hostInfo: '',
              id: '132944',
              scheduleTime: 1558270800,
              startTime: 1558270800,
              title: 'Staging Event 24/7',
            },
          ],
          timeZone: 'America/Chicago',
        },
      }
    );

    expect(getByTestId('schedule')).toBeTruthy();
  });

  test('EVENT_NOTES type renders Event Notes', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Tab
        type={EVENT_NOTES}
      />
    );

    expect(getByTestId('eventNotes')).toBeTruthy();
  });

  test('BIBLE type renders Coming Soon', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Tab
        type={BIBLE}
      />
    );

    expect(getByTestId('comingSoon')).toBeTruthy();
    expect(getByTestId('comingSoon').textContent).toEqual('bible is Coming Soon.');
  });
});
