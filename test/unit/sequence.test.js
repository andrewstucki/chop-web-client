// @flow
import { createStore, combineReducers } from 'redux';
import sequenceReducer, {
  setSequence,
  getNextStep,
  popStep,
  getNextFetchTime,
  getNextTransitionTime,
  getServerTime,
  getNextData,
  hasSequence,
  setStepData,
} from '../../src/sequence/dux';

describe('Sequence Tests', () => {
  const reducer = combineReducers({
    sequence: sequenceReducer,
  });

  const data = {
    eventAt: {
      description: '',
      endTime: 0,
      eventTime: {
        id: '',
      },
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
      feeds: [
        {
          id: '',
          name: '',
          type: '',
          direct: false,
          participants: [],
        },
      ],
    },
  };

  test('Add sequences, get top one back', () => {
    const store = createStore(reducer);
    store.dispatch(
      setSequence({
        serverTime: 150000,
        steps: [
          {
            fetchTime: 150010,
            transitionTime: 150020,
            queries: [],
          },
          {
            fetchTime: 150050,
            transitionTime: 150060,
            queries: [],
          },
        ],
      })
    );

    expect(getNextStep(store.getState())).toEqual({
      fetchTime: 150010,
      transitionTime: 150020,
      queries: [],
    });
    store.dispatch(popStep());
    expect(getNextStep(store.getState())).toEqual({
      fetchTime: 150050,
      transitionTime: 150060,
      queries: [],
    });
  });

  test('Get next time', () => {
    const store = createStore(reducer);
    store.dispatch(
      setSequence({
        serverTime: 150000,
        steps: [
          {
            fetchTime: 150010,
            transitionTime: 150020,
            queries: [],
          },
          {
            fetchTime: 150050,
            transitionTime: 150060,
            queries: [],
          },
        ],
      })
    );

    expect(getNextFetchTime(store.getState(), 150005)).toEqual(150010);
  });

  test('Get next, next time', () => {
    const store = createStore(reducer);
    store.dispatch(
      setSequence({
        serverTime: 150000,
        steps: [
          {
            fetchTime: 150010,
            transitionTime: 150020,
            queries: [],
          },
          {
            fetchTime: 150050,
            transitionTime: 150060,
            queries: [],
          },
        ],
      })
    );

    expect(getNextTransitionTime(store.getState(), 150015)).toBe(150020);
  });

  test('Set data', () => {
    const store = createStore(reducer);
    store.dispatch(
      setSequence({
        serverTime: 150000,
        steps: [
          {
            fetchTime: 150010,
            transitionTime: 150020,
            queries: [],
          },
          {
            fetchTime: 150050,
            transitionTime: 150060,
            queries: [],
          },
        ],
      })
    );

    store.dispatch(setStepData(data));
    expect(getNextStep(store.getState())).toEqual({
      fetchTime: 150010,
      transitionTime: 150020,
      queries: [],
      data: data,
    });
  });

  test('has sequence', () => {
    const store = createStore(reducer);
    store.dispatch(
      setSequence({
        serverTime: 150000,
        steps: [
          {
            fetchTime: 150010,
            transitionTime: 150020,
            queries: [],
          },
          {
            fetchTime: 150050,
            transitionTime: 150060,
            queries: [],
          },
        ],
      })
    );

    expect(hasSequence(store.getState())).toBeTruthy();
  });

  test('get server time', () => {
    const store = createStore(reducer);
    store.dispatch(
      setSequence({
        serverTime: 150000,
        steps: [
          {
            fetchTime: 150010,
            transitionTime: 150020,
            queries: [],
          },
          {
            fetchTime: 150050,
            transitionTime: 150060,
            queries: [],
          },
        ],
      })
    );

    expect(getServerTime(store.getState())).toBe(150000);
  });

  test('get next data', () => {
    const store = createStore(reducer);
    store.dispatch(
      setSequence({
        serverTime: 150000,
        steps: [
          {
            fetchTime: 150010,
            transitionTime: 150020,
            data: data,
            queries: [],
          },
          {
            fetchTime: 150050,
            transitionTime: 150060,
            queries: [],
          },
        ],
      })
    );

    expect(getNextData(store.getState())).toEqual(data);
  });
});
