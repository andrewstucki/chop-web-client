import Scheduler from '../../../src/io/scheduler';
import { mockDate } from '../../testUtils';
import mockSequenceData from '../../mockData/sequence.json';
import actorMiddleware from '../../../src/middleware/actor-middleware';
import { createStore, applyMiddleware } from 'redux';
import serviceActor from '../../../src/io/serviceActor';
import { mockCurrentState } from '../../../src/io/graphQL';
import reducer from '../../../src/chop/dux';
import { defaultState } from '../../../src/feed/dux';

jest.mock('../../../src/io/graphQL');

describe('Event Sequence Test', () => {
  test('processes a sequence of events', () => {
    jest.useFakeTimers();
    mockDate(0);

    const schedule = [
      {
        timestamp: 100,
        data: 42,
      },
      {
        timestamp: 200,
        data: 88,
      },
    ];
    const callback = jest.fn();
    const scheduler = new Scheduler(30, callback);
    scheduler.run(schedule);

    expect(callback).toHaveBeenCalledTimes(0);

    mockDate(100000);
    jest.advanceTimersByTime(100000);

    expect(callback).toHaveBeenCalledTimes(0);

    mockDate(130000);
    jest.advanceTimersByTime(30000);

    expect(callback).toHaveBeenCalledTimes(1);
    expect(callback).toHaveBeenCalledWith(42);

    mockDate(230000);
    jest.advanceTimersByTime(100000);

    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenCalledWith(88);
  });

  test('Insure only one timeout is set at a time', () => {
    jest.useFakeTimers();

    const schedule = [
      {
        timestamp: 100,
        data: 42,
      },
      {
        timestamp: 200,
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

  test('Schedule from file', async () => {
    jest.useFakeTimers();
    mockDate(1539966236305);
    global.document.cookie  = 'legacy_token=12345; ';
    mockCurrentState.mockResolvedValue(mockSequenceData);
    const actors = actorMiddleware(serviceActor);
    const store = createStore(
      reducer,
      applyMiddleware(actors)
    );

    await await store.dispatch({type: 'INIT'});

    expect(store.getState()).toEqual(
      {
        feed: {
          ...defaultState,
          event: {
            title: 'Fake Event',
            id: 334494,
            startTime: 1531864800,
          },
        },
      }
    );

    mockDate(1539966237305);
    jest.advanceTimersByTime(1000);

    expect(store.getState()).toEqual(
      {
        feed: {
          ...defaultState,
          event: {
            title: 'Fake Event',
            id: 334494,
            startTime: 1531864800,
          },
          pubnubKeys: {
            publish: "pub-9b402341-30c2-459f-9bed-69fd684a5e00",
            subscribe: "sub-5ef6daa3-9490-11e1-bef7-45383605a8b5"
          },
          channels: {
            '1ebd2b8e3530d1acaeba2be9c1875ad21376134e4b49e17fdbea6b6ba0930b6c': {
             id: "1ebd2b8e3530d1acaeba2be9c1875ad21376134e4b49e17fdbea6b6ba0930b6c",
             moments: [],
             name: "Public",
             participants: undefined,
           },
           '26a7b967c49cff813f5449271c8a1158bb430a09bf6db5847f88abf301ea9cb1': {
             id: "26a7b967c49cff813f5449271c8a1158bb430a09bf6db5847f88abf301ea9cb1",
             moments: [],
             name: "Personal",
             participants: undefined,
           },
           '4944bf368d26faf882940ee0811964cd357a37ccf468cd8ccdf25b95b0b52a28': {
             id: "4944bf368d26faf882940ee0811964cd357a37ccf468cd8ccdf25b95b0b52a28",
             moments: [],
             name: "Legacy",
             participants: undefined,
           },
           a70c52181da2f13f1f8313894c6125e2cdb87f1844fc785fb87988bc4725f2bc: {
             id: "a70c52181da2f13f1f8313894c6125e2cdb87f1844fc785fb87988bc4725f2bc",
             moments: [],
             name: "Host",
             participants: undefined,
           },
          },
          currentChannel: '1ebd2b8e3530d1acaeba2be9c1875ad21376134e4b49e17fdbea6b6ba0930b6c',
          video: {
            type: 'StandardEmbed',
            url: 'https://www.youtube.com/embed/uw_JA75to30',
          },
        },
      }
    );
  });
});
