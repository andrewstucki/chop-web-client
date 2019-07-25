// @flow
import { runSaga } from 'redux-saga';
import { select, call, put, delay } from 'redux-saga/effects';
import { defaultState, mockDate } from '../../testUtils';
import { send, heartbeat, heartbeatData, prayerRequestData } from '../../../src/io/sagas/metrics';
import { isHeartbeatStarted, startHeartbeat } from '../../../src/ui/dux';

describe('Metrics IO', () => {
  mockDate('Wed Jun 27 2018 16:53:06 GMT-0000');
  test('Metrics success', async () => {
    // $FlowFixMe
    fetch.mockResponseOnce('{"success": "true"}', { status: 200, headers: { 'content-type': 'application/json' }});
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
      getState: () => defaultState,
    },
    send,
    'church.life.chop.action', {
      client: 'CWC',
      event_id: '123',
      event_schedule_time: '2018-05-08T14:00:00Z',
      event_start_time: '2018-06-27T16:53:06.000Z',
      event_time_id: '456',
      interval: 30,
      location: 'https://live.life.church/',
      organization_id: 2,
      referrer: '',
      session_id: 'omnomnom',
      subscriber_id: '09876',
      timestamp: '2018-06-27T16:53:06.000Z',
      user_agent: 'Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0',
    },
    ).toPromise();

    expect(fetch).toBeCalledTimes(1);
    // $FlowFixMe
    expect(fetch.mock.calls[0][0]).toEqual('http://metricsengine.io/topics/metrics-ingest/publish');
    // $FlowFixMe
    expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({
      type: 'church.life.chop_staging.action',
      id: expect.stringMatching(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/),
      source: 'https://live.life.church/',
      specversion: '0.2',
      contentType: 'application/json',
      data: {
        client: 'CWC',
        event_id: '123',
        event_schedule_time: '2018-05-08T14:00:00Z',
        event_start_time: '2018-06-27T16:53:06.000Z',
        event_time_id: '456',
        interval: 30,
        location: 'https://live.life.church/',
        organization_id: 2,
        referrer: '',
        session_id: 'omnomnom',
        subscriber_id: '09876',
        timestamp: '2018-06-27T16:53:06.000Z',
        user_agent: 'Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0',
      },
      time: '2018-06-27T16:53:06.000Z',
    });
  });

  test('Heartbeat', () => {
    const generator = heartbeat();
    expect(generator.next().value).toEqual(select(isHeartbeatStarted));
    expect(generator.next().value).toEqual(put(startHeartbeat()));
    expect(generator.next().value).toEqual(call(heartbeatData, 0));
    // TODO: The value is 'undefined' because we would have to implement something like redux-saga-test-plan to get the actual
    // value of calling the heartbeatData generator from this generator. For now, that is tested separately in the 'HeartbeatData' test.
    // $FlowFixMe
    expect(generator.next().value).toEqual(call(send, 'church.life.chop.heartbeat.v1_1', undefined));
    expect(generator.next().value).toEqual(delay(3000));
    expect(generator.next().value).toEqual(call(heartbeatData, 3));
    // $FlowFixMe
    expect(generator.next().value).toEqual(call(send, 'church.life.chop.heartbeat.v1_1', undefined));
    expect(generator.next().value).toEqual(delay(7000));
    expect(generator.next().value).toEqual(call(heartbeatData, 10));
    // $FlowFixMe
    expect(generator.next().value).toEqual(call(send, 'church.life.chop.heartbeat.v1_1', undefined));
    expect(generator.next().value).toEqual(delay(20000));
    expect(generator.next().value).toEqual(call(heartbeatData, 30));// $FlowFixMe
    expect(generator.next().value).toEqual(call(send, 'church.life.chop.heartbeat.v1_1', undefined));
    expect(generator.next().value).toEqual(delay(30000));
    expect(generator.next().value).toEqual(call(heartbeatData, 60));
    // $FlowFixMe
    expect(generator.next().value).toEqual(call(send, 'church.life.chop.heartbeat.v1_1', undefined));
    expect(generator.next().value).toEqual(delay(60000));
    expect(generator.next().value).toEqual(call(heartbeatData, 60));
    // $FlowFixMe
    expect(generator.next().value).toEqual(call(send, 'church.life.chop.heartbeat.v1_1', undefined));
    expect(generator.next().value).toEqual(delay(60000));
    expect(generator.next().value).toEqual(call(heartbeatData, 60));
    // $FlowFixMe
    expect(generator.next().value).toEqual(call(send, 'church.life.chop.heartbeat.v1_1', undefined));
    expect(generator.next().value).toEqual(delay(60000));
    expect(generator.next().value).toEqual(call(heartbeatData, 60));
    // $FlowFixMe
    expect(generator.next().value).toEqual(call(send, 'church.life.chop.heartbeat.v1_1', undefined));
    expect(generator.next().value).toEqual(delay(60000));
    expect(generator.next().value).toEqual(call(heartbeatData, 60));
    // $FlowFixMe
    expect(generator.next().value).toEqual(call(send, 'church.life.chop.heartbeat.v1_1', undefined));
    expect(generator.next().value).toEqual(delay(60000));
    expect(generator.next().value).toEqual(call(heartbeatData, 60));
    // $FlowFixMe
    expect(generator.next().value).toEqual(call(send, 'church.life.chop.heartbeat.v1_1', undefined));
    expect(generator.next().value).toEqual(delay(60000));
    expect(generator.next().value).toEqual(call(heartbeatData, 60));
    // $FlowFixMe
    expect(generator.next().value).toEqual(call(send, 'church.life.chop.heartbeat.v1_1', undefined));
    expect(generator.next().value).toEqual(delay(60000));
    expect(generator.next().value).toEqual(call(heartbeatData, 60));
    // $FlowFixMe
    expect(generator.next().value).toEqual(call(send, 'church.life.chop.heartbeat.v1_1', undefined));
    expect(generator.next().value).toEqual(delay(60000));
    expect(generator.next().value).toEqual(call(heartbeatData, 60));
    // $FlowFixMe
    expect(generator.next().value).toEqual(call(send, 'church.life.chop.heartbeat.v1_1', undefined));
    expect(generator.next().value).toEqual(delay(60000));
    expect(generator.next().value).toEqual(call(heartbeatData, 60));
    // $FlowFixMe
    expect(generator.next().value).toEqual(call(send, 'church.life.chop.heartbeat.v1_1', undefined));
    expect(generator.next().value).toEqual(delay(60000));
  });

  test('HeartbeatData', async () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'SESSIONID=omnomnom',
    });

    const result = await runSaga({
      getState: () => ({
        ...defaultState,
        event: {
          id: '123',
          eventTimeId: '456',
        },
      }),
    },
    heartbeatData,
    30, 0
    ).toPromise();

    expect(result).toEqual({
      client: 'CWC',
      event_id: '123',
      event_start_time: '2018-06-27T16:53:06.000Z',
      event_schedule_time: '2018-06-27T16:53:06.000Z',
      event_time_id: '456',
      interval: 30,
      location: 'https://live.life.church/',
      organization_id: 2,
      referrer: '',
      session_id: 'omnomnom',
      subscriber_id: '09876',
      timestamp: '2018-06-27T16:53:06.000Z',
      user_agent: expect.stringContaining('jsdom'),
    });
  });

  test('RequestPrayerData', async () => {
    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'SESSIONID=omnomnom',
    });

    const result = await runSaga({
      getState: () => ({
        ...defaultState,
        event: {
          id: '123',
          eventTimeId: '456',
        },
      }),
    },
    prayerRequestData,
    '123abc'
    ).toPromise();

    expect(result).toEqual({
      client: 'CWC',
      event_id: '123',
      event_start_time: '2018-06-27T16:53:06.000Z',
      event_schedule_time: '2018-06-27T16:53:06.000Z',
      event_time_id: '456',
      channel_token: '123abc',
      location: 'https://live.life.church/',
      organization_id: 2,
      referrer: '',
      session_id: 'omnomnom',
      subscriber_id: '09876',
      timestamp: '2018-06-27T16:53:06.000Z',
      user_agent: expect.stringContaining('jsdom'),
    });
  });
});
