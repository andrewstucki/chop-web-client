// @flow
import { runSaga } from 'redux-saga';
import { defaultState, mockDate } from '../../testUtils';
import { send } from '../../../src/io/sagas/metrics';

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
    'church.life.chop.action', { details: 'cool' },
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
        details: 'cool',
      },
      time: '2018-06-27T16:53:06.000Z',
    });
  });
});
