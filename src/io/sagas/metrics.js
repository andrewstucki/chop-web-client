// @flow
import type { Saga } from 'redux-saga';
import { call } from 'redux-saga/effects';
import { API } from '../API';
import bugsnagClient from '../../util/bugsnag';
import { createUid, isProduction } from '../../util';
import dayjs from 'dayjs';

// Only leave as any until actual metrics events are added
type MetricsEventType = any;
type MetricsData = any;
type MetricsSchema = {
  type: MetricsEventType,
  id: string,
  source: string,
  specversion: string,
  data: MetricsData,
  contentType: string,
  time: string,
}

// eslint-disable-next-line no-unused-vars
function* send (type: MetricsEventType, data:MetricsData): Saga<void> {
  try {
    const eventData:MetricsSchema = {
      type: isProduction() ? type : getStagingEvent(type),
      id: createUid(),
      source: window.location.href,
      specversion: '0.2',
      contentType: 'application/json',
      data,
      time: dayjs().toISOString(),
    };
    yield call([API, API.metrics], eventData);
  } catch (error) {
    bugsnagClient.notify(error);
  }
}

const getStagingEvent = (event:MetricsEventType):string => {
  const eventParts = event.split('.');
  eventParts[2] = `${eventParts[2]}_staging`;
  return eventParts.join('.');
};

export {
  send,
};
