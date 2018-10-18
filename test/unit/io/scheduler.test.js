import Scheduler from '../../../src/io/scheduler';
import { mockDate } from '../../testUtils';

describe('Event Sequence Test', () => {
  test('processes a sequence of events', () => {
    jest.useFakeTimers();
    mockDate(0);

    const schedule = [
      {
        time: 100,
        data: 42,
      },
      {
        time: 200,
        data: 88,
      },
    ];
    const callback = jest.fn();
    const scheduler = new Scheduler(30, callback);
    scheduler.run(schedule);

    expect(callback).toHaveBeenCalledTimes(0);

    mockDate(100);
    jest.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(0);

    mockDate(130);
    jest.advanceTimersByTime(30);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(42);

    mockDate(230);
    jest.advanceTimersByTime(100);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(88);
  });

  test('Insure only one timeout is set at a time', () => {
    jest.useFakeTimers();

    const schedule = [
      {
        time: 100,
        data: 42,
      },
      {
        time: 200,
        data: 88,
      },
    ];

    const callback = jest.fn();
    const scheduler = new Scheduler(0, callback);
    scheduler.run(schedule);

    jest.runOnlyPendingTimers();

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(42);
  });
});
