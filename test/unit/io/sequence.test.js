// @flow
import { call, select, put } from 'redux-saga/effects';
import {
  fetchNextState,
  transitionSequence,
  checkForSequence,
  delay,
  getNextEvent,
  startTimer,
} from '../../../src/io/sagas/sequence';
import {
  getNextFetchTime,
  getServerTime,
  getNextTransitionTime,
  getNextData,
  setStepData,
  hasSequence,
} from '../../../src/sequence/dux';
import {
  popSchedule,
} from '../../../src/schedule/dux';
import queries from '../../../src/io/queries';
import { eventAt } from '../../../src/io/sagas/currentEvent';
import { mockDate } from '../../testUtils/index';

describe('Test Sequence saga', () => {
  const data = {
    eventAt: {
      description: '',
      endTime: 0,
      eventTime: {
        id: '',
      },
      scheduleTime: 0,
      hostInfo: '',
      id: '',
      speaker: '',
      startTime: 0,
      title: '',
      videoStartTime: 0,
      video: {
        type: 'offline',
        url: '',
      },
      feed: [
        {
          id: '',
          name: '',
          type: '',
          direct: false,
          subscribers: [],
        },
      ],
    },
  };

  test('fetch next state', async () => {
    const gen = fetchNextState();

    expect(gen.next().value).toEqual(select(getNextFetchTime));
    expect(gen.next(150010).value).toEqual(select(getServerTime));
    expect(gen.next(150000).value).toEqual(call(delay, 150010, 150000));
    expect(gen.next().value).toEqual(select(getNextTransitionTime));
    expect(gen.next(150020).value).toEqual(call([queries, queries.eventAtTime], 150020));
    expect(gen.next(data).value).toEqual(put(setStepData(data)));
  });

  test('transition sequence', () => {
    const gen = transitionSequence();

    expect(gen.next().value).toEqual(select(getNextTransitionTime));
    expect(gen.next(150020).value).toEqual(select(getServerTime));
    expect(gen.next(150000).value).toEqual(call(delay, 150020, 150000));
    expect(gen.next().value).toEqual(select(getNextData));
    expect(gen.next(data).value).toEqual(call(eventAt, data.eventAt));
  });

  test('check from sequence', () => {
    mockDate(1556302450836);
    const gen = checkForSequence();

    expect(gen.next().value).toEqual(select(hasSequence));
    expect(gen.next(true).done).toBeTruthy();
  });

  test('get next event', () => {
    const gen = getNextEvent();

    expect(gen.next().value).toEqual(put(popSchedule(1556302450836)));
  });

  test('breaks out of a fast iterating loop', () => {
    const gen = startTimer();

    gen.next();
    gen.next();
    expect(gen.next().done).toBeTruthy();
  });
});
