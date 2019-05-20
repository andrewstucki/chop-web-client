import React from 'react';
import Schedule from '../../src/schedule';
import { renderWithReduxAndTheme } from '../testUtils';

describe('Schedule', () => {
  test('Renders a no schedule when the schedule is empty', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Schedule />
    );

    expect(getByTestId('schedule-noschedule')).toBeTruthy();
  });

  test('Renders the schedule when it exists', () => {
    const { queryAllByTestId, getAllByTestId } = renderWithReduxAndTheme(
      <Schedule />,
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

    const [groupOne, groupTwo, groupThree] = queryAllByTestId('schedule-groupHeader');
    expect(groupOne.textContent).toEqual('Friday May, 17');
    expect(groupTwo.textContent).toEqual('Saturday May, 18');
    expect(groupThree.textContent).toEqual('Sunday May, 19');
    expect(getAllByTestId('schedule-itemTime')[0].textContent).toEqual('8:00am');
    expect(getAllByTestId('schedule-itemTitle')[0].textContent).toEqual('Staging Event 24/7');
  });
});
