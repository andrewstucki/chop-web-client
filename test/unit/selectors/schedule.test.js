// @flow
import { getScheduleGroupedByDay } from '../../../src/schedule/dux';

describe('Schedule selectors', () => {
  test('Group selector returns the schedule grouped', () => {
    expect(getScheduleGroupedByDay({
      schedule: {
        items: [
          {
            endTime: 1553817500,
            id: '129073',
            scheduleTime: 1542290400,
            startTime: 1557869428,
            fetchTime: 1542289490,
            title: 'Mastermind',
            hostInfo: '',
          },
          {
            endTime: 1542463200,
            id: '129073',
            scheduleTime: 1542376800,
            startTime: 1557955839,
            fetchTime: 1542375890,
            title: 'Mastermind',
            hostInfo: '',
          },
          {
            endTime: 1542463200,
            id: '129073',
            scheduleTime: 1542396800,
            startTime: 1557955839,
            fetchTime: 1542375890,
            title: 'Mastermind',
            hostInfo: '',
          },
        ],
        timeZone: 'America/Chicago',
      },
    })).toEqual({
      '20190514': [
        {
          endTime: 1553817500,
          id: '129073',
          scheduleTime: 1542290400,
          startTime: 1557869428,
          fetchTime: 1542289490,
          title: 'Mastermind',
          hostInfo: '',
        },
      ],
      '20190515': [
        {
          endTime: 1542463200,
          id: '129073',
          scheduleTime: 1542376800,
          startTime: 1557955839,
          fetchTime: 1542375890,
          title: 'Mastermind',
          hostInfo: '',
        },
        {
          endTime: 1542463200,
          id: '129073',
          scheduleTime: 1542396800,
          startTime: 1557955839,
          fetchTime: 1542375890,
          title: 'Mastermind',
          hostInfo: '',
        },
      ],
    });
  });
});
