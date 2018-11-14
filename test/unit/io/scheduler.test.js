import Scheduler from '../../../src/io/scheduler';
import { mockDate } from '../../testUtils';
import mockSequenceData from '../../mockData/sequence.json';
import mockScheduleData from '../../mockData/schedule.json';
import actorMiddleware from '../../../src/middleware/actor-middleware';
import { createStore, applyMiddleware } from 'redux';
import serviceActor from '../../../src/io/serviceActor';
import {
  mockCurrentState,
  mockEventAtTime,
  mockGetSequence,
} from '../../../src/io/graphQL';
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

  test('Sequence from file', async () => {
    jest.useFakeTimers();
    mockDate(1539966236000);
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
          pubnubKeys: {
            publish: 'pub-9b402341-30c2-459f-9bed-69fd684a5e00',
            subscribe: 'sub-5ef6daa3-9490-11e1-bef7-45383605a8b5',
          },
          sequence: {
            serverTime: 1539966236,
            steps: [
              {
                fetchTime: 1542289491,
                query: ['feed'],
                transitionTime: 1542289492,
              },
              {
                fetchTime: 1542289493,
                query: ['event', 'video'],
                transitionTime: 1542289494,
              },
              {
                fetchTime: 1542289495,
                query: ['event', 'video', 'feed'],
                transitionTime: 1542289496,
              },
            ],
          },
        },
      }
    );


    mockEventAtTime.mockResolvedValue(
      {
        currentEvent: {
          title: 'Fake Event',
          id: 334494,
          startTime: 1531864800,
          feeds: [
            {
              id: '1ebd2b8e3530d1acaeba2be9c1875ad21376134e4b49e17fdbea6b6ba0930b6c',
              name: 'Public',
            },
            {
              id: '26a7b967c49cff813f5449271c8a1158bb430a09bf6db5847f88abf301ea9cb1',
              name: 'Personal',
            },
            {
              id: '4944bf368d26faf882940ee0811964cd357a37ccf468cd8ccdf25b95b0b52a28',
              name: 'Legacy',
            },
            {
              id: 'a70c52181da2f13f1f8313894c6125e2cdb87f1844fc785fb87988bc4725f2bc',
              name: 'Host',
            },
          ],
        },
      }
    );

    mockDate(1542289491000);
    await jest.advanceTimersByTime(1000);

    expect(store.getState()).toEqual(
      {
        feed: {
          ...defaultState,
          pubnubKeys: {
            publish: 'pub-9b402341-30c2-459f-9bed-69fd684a5e00',
            subscribe: 'sub-5ef6daa3-9490-11e1-bef7-45383605a8b5',
          },
          sequence: {
            serverTime: 1539966236,
            steps: [
              {
                fetchTime: 1542289491,
                query: ['feed'],
                transitionTime: 1542289492,
                data: {
                  currentEvent: {
                    title: 'Fake Event',
                    id: 334494,
                    startTime: 1531864800,
                    feeds: [
                      {
                        id: '1ebd2b8e3530d1acaeba2be9c1875ad21376134e4b49e17fdbea6b6ba0930b6c',
                        name: 'Public',
                      },
                      {
                        id: '26a7b967c49cff813f5449271c8a1158bb430a09bf6db5847f88abf301ea9cb1',
                        name: 'Personal',
                      },
                      {
                        id: '4944bf368d26faf882940ee0811964cd357a37ccf468cd8ccdf25b95b0b52a28',
                        name: 'Legacy',
                      },
                      {
                        id: 'a70c52181da2f13f1f8313894c6125e2cdb87f1844fc785fb87988bc4725f2bc',
                        name: 'Host',
                      },
                    ],
                  },
                },
              },
              {
                fetchTime: 1542289493,
                query: ['event', 'video'],
                transitionTime: 1542289494,
              },
              {
                fetchTime: 1542289495,
                query: ['event', 'video', 'feed'],
                transitionTime: 1542289496,
              },
            ],
          },
        },
      }
    );

    mockDate(1542289492000);
    jest.advanceTimersByTime(1000);
    
    expect(store.getState()).toEqual(
      {
        feed: {
          ...defaultState,
          pubnubKeys: {
            publish: 'pub-9b402341-30c2-459f-9bed-69fd684a5e00',
            subscribe: 'sub-5ef6daa3-9490-11e1-bef7-45383605a8b5',
          },
          event: {
            title: 'Fake Event',
            id: 334494,
            startTime: 1531864800,
          },
          sequence: {
            serverTime: 1539966236,
            steps: [
              {
                fetchTime: 1542289493,
                query: ['event', 'video'],
                transitionTime: 1542289494,
              },
              {
                fetchTime: 1542289495,
                query: ['event', 'video', 'feed'],
                transitionTime: 1542289496,
              },
            ],
          },
          channels: {
            '1ebd2b8e3530d1acaeba2be9c1875ad21376134e4b49e17fdbea6b6ba0930b6c': {
              id: '1ebd2b8e3530d1acaeba2be9c1875ad21376134e4b49e17fdbea6b6ba0930b6c',
              moments: [],
              name: 'Public',
              participants: [],
            },
            '26a7b967c49cff813f5449271c8a1158bb430a09bf6db5847f88abf301ea9cb1': {
              id: '26a7b967c49cff813f5449271c8a1158bb430a09bf6db5847f88abf301ea9cb1',
              moments: [],
              name: 'Personal',
              participants: [],
            },
            '4944bf368d26faf882940ee0811964cd357a37ccf468cd8ccdf25b95b0b52a28': {
              id: '4944bf368d26faf882940ee0811964cd357a37ccf468cd8ccdf25b95b0b52a28',
              moments: [],
              name: 'Legacy',
              participants: [],
            },
            a70c52181da2f13f1f8313894c6125e2cdb87f1844fc785fb87988bc4725f2bc: {
              id: 'a70c52181da2f13f1f8313894c6125e2cdb87f1844fc785fb87988bc4725f2bc',
              moments: [],
              name: 'Host',
              participants: [],
            },
          },
          currentChannel: '1ebd2b8e3530d1acaeba2be9c1875ad21376134e4b49e17fdbea6b6ba0930b6c',
        },
      }
    );
  });

  test('Schedule from file', async () => {
    jest.useFakeTimers();
    mockDate(1542289489000);
    global.document.cookie  = 'legacy_token=12345; ';
    mockCurrentState.mockResolvedValue(mockScheduleData);
    mockGetSequence.mockResolvedValue(mockSequenceData);
    const actors = actorMiddleware(serviceActor);
    const store = createStore(
      reducer,
      applyMiddleware(actors)
    );

    await await store.dispatch({type: 'INIT'});

    expect(store.getState().feed).toEqual(
      {
        ...defaultState,
        schedule: [
          {
            endTime: 1542376800,
            fetchTime: 1542289490,
            id: '129073',
            scheduleTime: 1542290400,
            startTime: 1542289500,
            title: 'Mastermind',
          },
          {
            endTime: 1542463200,
            fetchTime: 1542375890,
            id: '129073',
            scheduleTime: 1542376800,
            startTime: 1542375900,
            title: 'Mastermind',
          },
          {
            endTime: 1542549600,
            fetchTime: 1542462290,
            id: '129073',
            scheduleTime: 1542463200,
            startTime: 1542462300,
            title: 'Mastermind',
          },
          {
            endTime: 1542636000,
            fetchTime: 1542548690,
            id: '129073',
            scheduleTime: 1542549600,
            startTime: 1542548700,
            title: 'Mastermind',
          },
          {
            endTime: 1542722400,
            fetchTime: 1542635090,
            id: '129073',
            scheduleTime: 1542636000,
            startTime: 1542635100,
            title: 'Mastermind',
          },
          {
            endTime: 1542808800,
            fetchTime: 1542721490,
            id: '129073',
            scheduleTime: 1542722400,
            startTime: 1542721500,
            title: 'Mastermind',
          },
          {
            endTime: 1542895200,
            fetchTime: 1542807890,
            id: '129073',
            scheduleTime: 1542808800,
            startTime: 1542807900,
            title: 'Mastermind',
          },
          {
            endTime: 1542981600,
            fetchTime: 1542894290,
            id: '129073',
            scheduleTime: 1542895200,
            startTime: 1542894300,
            title: 'Mastermind',
          },
          {
            endTime: 1543068000,
            fetchTime: 1542980690,
            id: '129073',
            scheduleTime: 1542981600,
            startTime: 1542980700,
            title: 'Mastermind',
          },
          {
            endTime: 1543154400,
            fetchTime: 1543067090,
            id: '129073',
            scheduleTime: 1543068000,
            startTime: 1543067100,
            title: 'Mastermind',
          },
        ],
      }
    );

    mockDate(1542289490000);
    await jest.advanceTimersByTime(1000);

    expect(store.getState().feed).toEqual(
      {
        ...defaultState,
        pubnubKeys: {
          publish: 'pub-9b402341-30c2-459f-9bed-69fd684a5e00',
          subscribe: 'sub-5ef6daa3-9490-11e1-bef7-45383605a8b5',
        },
        sequence: {
          serverTime: 1539966236,
          steps: [
            {
              fetchTime: 1542289491,
              query: ['feed'],
              transitionTime: 1542289492,
            },
            {
              fetchTime: 1542289493,
              query: ['event', 'video'],
              transitionTime: 1542289494,
            },
            {
              fetchTime: 1542289495,
              query: ['event', 'video', 'feed'],
              transitionTime: 1542289496,
            },
          ],
        },
        schedule: [
          {
            endTime: 1542463200,
            fetchTime: 1542375890,
            id: '129073',
            scheduleTime: 1542376800,
            startTime: 1542375900,
            title: 'Mastermind',
          },
          {
            endTime: 1542549600,
            fetchTime: 1542462290,
            id: '129073',
            scheduleTime: 1542463200,
            startTime: 1542462300,
            title: 'Mastermind',
          },
          {
            endTime: 1542636000,
            fetchTime: 1542548690,
            id: '129073',
            scheduleTime: 1542549600,
            startTime: 1542548700,
            title: 'Mastermind',
          },
          {
            endTime: 1542722400,
            fetchTime: 1542635090,
            id: '129073',
            scheduleTime: 1542636000,
            startTime: 1542635100,
            title: 'Mastermind',
          },
          {
            endTime: 1542808800,
            fetchTime: 1542721490,
            id: '129073',
            scheduleTime: 1542722400,
            startTime: 1542721500,
            title: 'Mastermind',
          },
          {
            endTime: 1542895200,
            fetchTime: 1542807890,
            id: '129073',
            scheduleTime: 1542808800,
            startTime: 1542807900,
            title: 'Mastermind',
          },
          {
            endTime: 1542981600,
            fetchTime: 1542894290,
            id: '129073',
            scheduleTime: 1542895200,
            startTime: 1542894300,
            title: 'Mastermind',
          },
          {
            endTime: 1543068000,
            fetchTime: 1542980690,
            id: '129073',
            scheduleTime: 1542981600,
            startTime: 1542980700,
            title: 'Mastermind',
          },
          {
            endTime: 1543154400,
            fetchTime: 1543067090,
            id: '129073',
            scheduleTime: 1543068000,
            startTime: 1543067100,
            title: 'Mastermind',
          },
        ],
      }
    );
  });
});
