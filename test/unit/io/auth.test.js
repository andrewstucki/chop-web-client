// @flow
import { basicAuth, guestAuth, logout, checkAuth, init } from '../../../src/io/saga';
import { runSaga } from 'redux-saga';
import { BASIC_AUTH_LOGIN, BASIC_AUTH_LOGIN_FAILED } from '../../../src/login/dux';
import { defaultState, mockDate } from '../../testUtils';
import { currentEvent } from '../../../src/io/sagas/currentEvent';
import { errorBanner, loggedInBanner } from '../../../src/banner/dux';
import { togglePopUpModal } from '../../../src/popUpModal/dux';

jest.mock('../../../src/io/sagas/currentEvent');
const mock = (mockFn: any) => mockFn;

describe('Test Auth', () => {
  const mockCurrentEvent = mock(currentEvent);

  beforeEach(() => {
    mockCurrentEvent.mockReset();
    document.cookie = '';
    // $FlowFixMe
    fetch.resetMocks();
  });

  test('Basic Auth success', async () => {
    mockDate('Wed Jun 27 2018 16:53:06 GMT-0000');

    Object.defineProperty(window.document, 'cookie', {
      writable: true,
      value: 'SESSIONID=omnomnom',
    });

    // $FlowFixMe
    fetch.mockResponseOnce('{"access_token": "accesstoken", "refresh_token": "refreshtoken", "errors": [] }', { status: 200, headers: { 'content-type': 'application/json' }});
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
      getState: () => ({
        ...defaultState,
        event: {
          ...defaultState.event,
          id: '123456',
          scheduleTime: 1563829500,
          startTime: 1563829500,
          eventTimeId: '789123',
        },
      }),
    },
    basicAuth,
    { type: BASIC_AUTH_LOGIN, email: 'joe@test.com', password: '12345' },
    ).toPromise();

    expect(dispatched).toEqual([
      togglePopUpModal(),
      loggedInBanner(),
    ]);

    expect(fetch).toBeCalledTimes(2);
    // $FlowFixMe
    expect(fetch.mock.calls[0][0]).toEqual(expect.stringContaining('/auth/basic'));
    // $FlowFixMe
    expect(fetch.mock.calls[0][1]).toEqual({
      body: JSON.stringify({
        email: 'joe@test.com',
        password: '12345',
      }),
      credentials: 'include',
      headers: new Headers({ 'Application-Domain': 'live.life.church', 'Content-Type': 'application/json' }),
      method: 'POST',
    });

    // $FlowFixMe
    expect(fetch.mock.calls[1][0]).toEqual('http://metricsengine.io/topics/metrics-ingest/publish');
    // $FlowFixMe
    expect(JSON.parse(fetch.mock.calls[1][1].body)).toEqual({
      type: 'church.life.chop_staging.login.v1_2',
      id: expect.stringMatching(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/),
      source: 'https://live.life.church/',
      specversion: '0.2',
      contentType: 'application/json',
      data: {
        client: 'CWC',
        location: 'https://live.life.church/',
        organization_id: 2,
        referrer: '',
        session_id: 'omnomnom',
        subscriber_id: '09876',
        timestamp: '2018-06-27T16:53:06.000Z',
        user_agent: expect.stringContaining('jsdom'),
        event_id: '123456',
        event_schedule_time: '2018-06-27T16:53:06.000Z',
        event_start_time: '2018-06-27T16:53:06.000Z',
        event_time_id: '789123',
      },
      time: '2018-06-27T16:53:06.000Z',
    });
  });

  test('Basic Auth fail', async () => {
    // $FlowFixMe
    fetch.mockResponseOnce('{"access_token": "", "refresh_token": "", "errors": [ { "code": "auth-001", "message": "Login Failed" }] }', { status: 200, headers: { 'content-type': 'application/json' }});
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    },
    basicAuth,
    { type: BASIC_AUTH_LOGIN, email: 'joe@test.com', password: '12345' },
    ).toPromise();

    expect(dispatched).toEqual([{type: BASIC_AUTH_LOGIN_FAILED, error: new Error('Login Failed')}]);
  });

  test('Guest Auth success', async () => {
    // $FlowFixMe
    fetch.mockResponseOnce('{"access_token": "accesstoken", "refresh_token": "refreshtoken", "errors": [] }', { status: 200, headers: { 'content-type': 'application/json' }});
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
      getState: () => defaultState,
    },
    guestAuth).toPromise();

    expect(dispatched).toEqual([]);
    expect(mockCurrentEvent).toBeCalledTimes(1);

    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/auth/guest'), {
      credentials: 'include',
      headers: new Headers({ 'Application-Domain': 'live.life.church', 'Content-Type': 'application/json' }),
      method: 'POST',
    });
  });

  test('Guest Auth fail', async () => {
    // $FlowFixMe
    fetch.mockResponseOnce('{"access_token": "", "refresh_token": "", "errors": [ { "code": "auth-001", "message": "Login Failed" }] }', { status: 200, headers: { 'content-type': 'application/json' }});
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    },
    guestAuth).toPromise();
    expect(dispatched).toEqual([errorBanner('error')]);
  });

  test('Auth Check success', async () => {
    // $FlowFixMe
    fetch.mockResponseOnce('{ "success": true }', { status: 200, headers: { 'content-type': 'application/json' }});
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
      getState: () => defaultState,
    },
    checkAuth).toPromise();

    expect(mockCurrentEvent).toBeCalledTimes(1);

    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/auth/check'), {
      credentials: 'include',
      headers: new Headers({ 'Application-Domain': 'live.life.church', Accept: 'application/json' }),
      method: 'GET',
    });
  });

  test('Logout success', async () => {
    // $FlowFixMe
    fetch.mockResponse('{ "success": true, "errors": [] }', { status: 200, headers: { 'content-type': 'application/json' }});
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    },
    logout).toPromise();
    expect(dispatched).toEqual([]);

    // Called twice because it guest auths when it fails
    expect(fetch).toBeCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/auth/logout'), {
      credentials: 'include',
      headers: new Headers({ 'Application-Domain': 'live.life.church', 'Content-Type': 'application/json' }),
      method: 'POST',
    });
  });

  test('Init uses legacy token if provided (success)', async () => {
    document.cookie = 'legacy_token=123456';
    // $FlowFixMe
    fetch.mockResponseOnce('{"access_token": "accesstoken", "refresh_token": "refreshtoken", "errors": [] }', { status: 200, headers: { 'content-type': 'application/json' }});
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    },
    init).toPromise();

    expect(dispatched).toEqual([
      loggedInBanner(),
    ]);

    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/auth/legacy'), {
      body: JSON.stringify({ legacy_token: '123456'}),
      credentials: 'include',
      headers: new Headers({ 'Application-Domain': 'live.life.church', 'Content-Type': 'application/json' }),
      method: 'POST',
    });
  });

  test('Init uses check auth if no legacy_token', async () => {
    // $FlowFixMe
    fetch
      .once('{ "success": true }', { status: 200, headers: { 'content-type': 'application/json' }})
      .once('{"access_token": "accesstoken", "refresh_token": "refreshtoken", "errors": [] }', { status: 200, headers: { 'content-type': 'application/json' }});

    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    },
    init).toPromise();

    expect(dispatched).toEqual([loggedInBanner()]);
    expect(fetch).toBeCalledTimes(1);
  });

  test('Init uses legacy token if provided (failure)', async () => {
    document.cookie = 'legacy_token=123456';
    // $FlowFixMe
    fetch.mockResponseOnce('{"access_token": "", "refresh_token": "", "errors": [ { "code": "auth-001", "message": "Login Failed" }] }', { status: 200, headers: { 'content-type': 'application/json' }});
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    },
    init).toPromise();

    expect(dispatched).toEqual([
      errorBanner('error'),
    ]);

    // Called twice because it guest auths when it fails
    expect(fetch).toBeCalledTimes(2);
  });
});
