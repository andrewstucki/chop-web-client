// @flow
import {
  all,
  select,
  call,
  put,
} from 'redux-saga/effects';
import {
  setStepData,
  hasSequence,
  getNextFetchTime,
  getNextTransitionTime,
  getServerTime,
  getNextData,
  popStep,
} from '../../sequence/dux';
import {
  popSchedule,
  getNextStartTime,
} from '../../schedule/dux';
import queries from '../queries';
import type { Saga } from 'redux-saga';
import {
  eventAt,
  sequence,
} from './currentEvent';
import bugsnagClient from '../../util/bugsnag';

export const FETCH_SEQUENCE = 'FETCH_SEQUENCE';
export const TRANSITION_SEQUENCE = 'TRANSITION_SEQUENCE';
export const QUERY_SEQUENCE = 'QUERY_SEQUENCE';

export const delay = (timeSeconds: number, _serverTimeSeconds: number): Promise<void> => {
  const time = timeSeconds * 1000;
  const now = Date.now();
  return new Promise(res => setTimeout(res, (time - now)));
};

export function* checkForSequence (): Saga<void> {
  const queryNewSequence = yield select(hasSequence);
  if (!queryNewSequence) {
    yield call(getNextEvent);
  }
}

export function* getNextEvent (): Saga<void> {
  try {
    yield put(popSchedule(Date.now()));
    const startTime = yield select(getNextStartTime);
    const result = yield call([queries, queries.sequence], startTime);
    yield call(sequence, result.eventAt.sequence);
  } catch (error) {
    bugsnagClient.notify(error);
  }
}

export function* fetchNextState (): Saga<void> {
  try {
    const fetchTime = yield select(getNextFetchTime);
    const serverTime = yield select(getServerTime);
    if (fetchTime && serverTime) {
      yield call(delay, fetchTime, serverTime);
      const transitionTime = yield select(getNextTransitionTime);
      const results = yield call([queries, queries.eventAtTime], transitionTime);
      yield put(setStepData(results));
    }
  } catch (error) {
    bugsnagClient.notify(error);    
  }
}

export function* transitionSequence (): Saga<void> {
  try {
    const transitionTime = yield select(getNextTransitionTime);
    const serverTime = yield select(getServerTime);
    if (transitionTime && serverTime) {
      yield call(delay, transitionTime, serverTime);
      let data = yield select(getNextData);
      if (data === undefined) {
        data = yield call([queries, queries.eventAtTime], transitionTime);
      }
      yield call(eventAt, data.eventAt);
      yield put(popStep());
    }
  } catch (error) {
    bugsnagClient.notify(error);    
  }
}

export function* startTimer (): Saga<void> {
  while (true) {
    yield call(checkForSequence);
    yield all([
      call(fetchNextState),
      call(transitionSequence),
    ]);
  }
}
