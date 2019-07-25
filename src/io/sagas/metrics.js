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
import type { SharedSubscriberType } from '../../subscriber/dux';
import type { OrganizationType } from '../../feed/dux';

// Event Types
const HEARTBEAT_EVENT = 'church.life.chop.heartbeat.v1_1';
const LOGIN_EVENT = 'church.life.chop.login.v1_2';
const PRAYER_REQUESTED_EVENT = 'church.life.chop.prayer_requested.v1_2';
const PRAYER_ACCEPTED_EVENT = 'church.life.chop.prayer_accepted.v1_2';

type MetricsEventType =
  | typeof HEARTBEAT_EVENT
  | typeof LOGIN_EVENT;

// Data Types
type BaseDataType = {
  timestamp: string,
  session_id: string,
  subscriber_id: string,
  organization_id: number,
  referrer: string,
  user_agent: string,
  location: string,
  client: 'CWC',
  event_id: string,
  event_time_id: string,
  event_start_time: string,
  event_schedule_time: string,
};

type HeartbeatData = {
  interval: number,
} & BaseDataType;

type LoginData = BaseDataType;

type PrayerRequestData = {
  channel_token: string,
} & BaseDataType;

type MetricsData =
  | HeartbeatData
  | LoginData
  | PrayerRequestData;

type MetricsSchema = {
  type: MetricsEventType,
  id: string,
  source: string,
  specversion: string,
  data: MetricsData,
  contentType: string,
  time: string,
};

// Event Publishing
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

function* getBaseData (): Saga<BaseDataType> {
  const timeDifference:number = dayjs().diff((window.PAGE_LOAD_TIME || 0), 'ms');
  const sessionId:string = Cookie.get('SESSIONID');
  const organization:OrganizationType = yield select (getCurrentOrganization);
  const subscriber:SharedSubscriberType = yield select (getCurrentSubscriberAsSharedSubscriber);
  const event = yield select (getCurrentEvent);

  return {
    timestamp: dayjs().subtract(timeDifference, 'ms').toISOString(),
    session_id: sessionId,
    subscriber_id: subscriber.id,
    organization_id: organization.id,
    referrer: document.referrer,
    user_agent: navigator.userAgent,
    location: window.location.href,
    client: 'CWC',
    event_id: event.id,
    event_time_id: event.eventTimeId,
    // $FlowFixMe
    event_start_time: dayjs.unix(event.startTime).toISOString(),
    // $FlowFixMe
    event_schedule_time: dayjs.unix(event.scheduleTime).toISOString(),
  };
}

// Event Methods
function* heartbeat (): Saga<void> {
  const hasHeartbeatStarted = yield select(isHeartbeatStarted);

  if (hasHeartbeatStarted) {
    return;
  }

  try {
    yield put(startHeartbeat());
    // load
    const heartbeat0 = yield call(heartbeatData, 0);
    yield call(send, HEARTBEAT_EVENT, heartbeat0);

    // 3 sec
    yield delay(3000);
    const heartbeat3 = yield call(heartbeatData, 3);
    yield call(send, HEARTBEAT_EVENT, heartbeat3);

    // 10 sec (3 + 7 = 10)
    yield delay(7000);
    const heartbeat10 = yield call(heartbeatData, 10);
    yield call(send, HEARTBEAT_EVENT, heartbeat10);

    // 30 sec (3 + 7 + 20 = 30)
    yield delay(20000);
    const heartbeat30 = yield call(heartbeatData, 30);
    yield call(send, HEARTBEAT_EVENT, heartbeat30);

    // 60 sec (3 + 7 + 20 + 30 = 60)
    yield delay(30000);
    const heartbeat60 = yield call(heartbeatData, 60);
    yield call(send, HEARTBEAT_EVENT, heartbeat60);

    // 1 minute intervals
    while (true) {
      yield delay(60000);
      const heartbeatInterval = yield call(heartbeatData, 60);
      yield call(send, HEARTBEAT_EVENT, heartbeatInterval);
    }
  } catch (error) {
    bugsnagClient.notify(error);
  }
}

function* heartbeatData (interval:number):Saga<HeartbeatData> {
  const baseData = yield call(getBaseData);
  return {
    ...baseData,
    interval,
  };
}

function* prayerRequestData (channelId:string):Saga<PrayerRequestData> {
  const baseData = yield call(getBaseData);
  return {
    ...baseData,
    channel_token: channelId,
  };
}

function* loginEvent ():Saga<void> {
  try {
    const baseData = yield call(getBaseData);
    yield call(send, LOGIN_EVENT, baseData);
  } catch (error) {
    bugsnagClient.notify(error);
  }
}

function* prayerRequestedEvent (channelId:string):Saga<void> {
  try {
    const data = yield call(prayerRequestData, channelId);
    yield call(send, PRAYER_REQUESTED_EVENT, data);
  } catch (error) {
    bugsnagClient.notify(error);
  }
}

function* prayerAcceptedEvent (channelId:string):Saga<void> {
  try {
    const data = yield call(prayerRequestData, channelId);
    yield call(send, PRAYER_ACCEPTED_EVENT, data);
  } catch (error) {
    bugsnagClient.notify(error);
  }
}

export {
  send,
  heartbeat,
  heartbeatData,
  prayerRequestData,
  loginEvent,
  prayerRequestedEvent,
  prayerAcceptedEvent,
};
