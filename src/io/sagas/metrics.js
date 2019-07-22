// @flow
import Cookie from 'js-cookie';
import type { Saga } from 'redux-saga';
import { call, select, delay, put } from 'redux-saga/effects';
import { API } from '../API';
import bugsnagClient from '../../util/bugsnag';
import { createUid, isProduction } from '../../util';
import dayjs from 'dayjs';
import { getCurrentSubscriberAsSharedSubscriber } from '../../subscriber/dux';
import { getCurrentEvent } from '../../event/dux';
import { getCurrentOrganization } from '../../feed/dux';
import { isHeartbeatStarted, startHeartbeat } from '../../ui/dux';

// Event Types
const HEARTBEAT_EVENT = 'church.life.chop.heartbeat.v1_0';
type MetricsEventType = typeof HEARTBEAT_EVENT;

// Data Types
type HeartbeatData = {
  timestamp: string,
  session_id: string,
  organization_id: number,
  event_id: string,
  event_time_id: string,
  event_start_time: string,
  event_schedule_time: string,
  subscriber_id: string,
  interval: number,
  referrer: string,
  user_agent: string,
  location: string,
  client: 'CWC',
};

type MetricsData = HeartbeatData;

type MetricsSchema = {
  type: MetricsEventType,
  id: string,
  source: string,
  specversion: string,
  data: MetricsData,
  contentType: string,
  time: string,
};

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

function* heartbeat (): Saga<void> {
  const hasHeartbeatStarted = yield select(isHeartbeatStarted);

  if (hasHeartbeatStarted) {
    return;
  }

  const timeDifference = dayjs().diff((window.PAGE_LOAD_TIME || 0), 'ms');

  try {
    yield put(startHeartbeat());
    // load
    const heartbeat0 = yield call(heartbeatData, 0, timeDifference);
    yield call(send, HEARTBEAT_EVENT, heartbeat0);

    // 3 sec
    yield delay(3000);
    const heartbeat3 = yield call(heartbeatData, 3, timeDifference);
    yield call(send, HEARTBEAT_EVENT, heartbeat3);

    // 10 sec (3 + 7 = 10)
    yield delay(7000);
    const heartbeat10 = yield call(heartbeatData, 10, timeDifference);
    yield call(send, HEARTBEAT_EVENT, heartbeat10);

    // 30 sec (3 + 7 + 20 = 30)
    yield delay(20000);
    const heartbeat30 = yield call(heartbeatData, 30, timeDifference);
    yield call(send, HEARTBEAT_EVENT, heartbeat30);

    // 60 sec (3 + 7 + 20 + 30 = 60)
    yield delay(30000);
    const heartbeat60 = yield call(heartbeatData, 60, timeDifference);
    yield call(send, HEARTBEAT_EVENT, heartbeat60);

    // 1 minute intervals
    while (true) {
      yield delay(60000);
      const heartbeatInterval = yield call(heartbeatData, 60, timeDifference);
      yield call(send, HEARTBEAT_EVENT, heartbeatInterval);
    }
  } catch (error) {
    bugsnagClient.notify(error);
  }
}

function* heartbeatData (interval:number, timeDifference:number):Saga<HeartbeatData> {
  const subscriber = yield select (getCurrentSubscriberAsSharedSubscriber);
  const event = yield select (getCurrentEvent);
  const organization = yield select (getCurrentOrganization);
  const sessionId = Cookie.get('SESSIONID');

  return {
    timestamp: dayjs().subtract(timeDifference, 'ms').toISOString(),
    session_id: sessionId,
    organization_id: organization.id || null,
    event_id: event.id || null,
    event_time_id: event.eventTimeId || null,
    // $FlowFixMe
    event_start_time: event.startTime ? dayjs.unix(event.startTime).toISOString() : null,
    // $FlowFixMe
    event_schedule_time: event.scheduleTime ? dayjs.unix(event.scheduleTime).toISOString() : null,
    subscriber_id: subscriber.id,
    interval,
    referrer: document.referrer,
    user_agent: navigator.userAgent,
    location: window.location.href,
    client: 'CWC',
  };
}

export {
  send,
  heartbeat,
  heartbeatData,
};
