// @flow
import queries from '../../../src/io/queries';
import { publishAcceptedPrayerRequest } from '../../../src/io/saga';
import { runSaga } from 'redux-saga';
import {PUBLISH_ACCEPTED_PRAYER_REQUEST, PUBLISH_ACCEPTED_PRAYER_REQUEST_FAILED} from '../../../src/moment';
import {ADD_CHANNEL} from '../../../src/feed/dux';
import {mockDate} from '../../testUtils';

jest.mock('../../../src/io/queries');
const mock = (mockFn: any) => mockFn;

describe('Test Accept Prayer', () => {
  const mockAcceptPrayer = mock(queries.acceptPrayer);
  test('Accept Prayer success', async () => {
    mockDate(1553266446136);
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
      getState: () => ({
        feed: {
          channels: {
            '12345': {
              name: 'Public',
            },
          },
          hereNow: {
            '12345': [
              {
                id: '45678',
                state: {
                  available_prayer: true,
                },
              },
            ],
          },
        },
      }),
    }, publishAcceptedPrayerRequest, {
      type: PUBLISH_ACCEPTED_PRAYER_REQUEST,
      userRequestingPrayer: {
        pubnubToken: '67890',
        name: 'James T. Kirk',
        id: '09876',
        role: {
          label: '',
        },
      },
      hostChannel: '54321',
      prayerChannel: '12345',
      cancelled: false,
    }).toPromise();

    expect(mockAcceptPrayer).toBeCalledWith('12345', '67890', 'James T. Kirk');
    expect(dispatched).toEqual([
      {
        type: ADD_CHANNEL,
        channel: {
          direct: true,
          placeholder: false,
          id: '12345',
          name: 'Direct',
          anchorMoments: [],
          moments: [],
          participants: [
            {
              id: '123',
              avatar: null,
              name: 'James T. Kirk',
              pubnubToken: '67890',
              role: { label: '' },
            },
            {
              id: '456',
              avatar: null,
              name: 'Will Brown',
              pubnubToken: '54320',
              role: { label: '' },
            },
          ],
          scrollPosition: 0,
          sawLastMomentAt: 1553266446136,
        },
      },
      {
        name: 'primary',
        pane: {
          content: {
            channelId: '12345',
          },
          type: 'CHAT',
        },
        type: 'SET_PANE_CONTENT',
      },
    ]);
  });

  test('Accept Prayer fail', async () => {
    mockAcceptPrayer.mockImplementation(() => {
      throw new Error('Broken');
    });
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
      getState: () => ({
        feed: {
          channels: {
            '12345': {
              name: 'Public',
            },
          },
          hereNow: {
            '12345': [
              {
                id: '45678',
                state: {
                  available_prayer: true,
                },
              },
            ],
          },
        },
      }),
    }, publishAcceptedPrayerRequest, {
      type: PUBLISH_ACCEPTED_PRAYER_REQUEST,
      userRequestingPrayer: {
        pubnubToken: '67890',
        name: 'James T. Kirk',
        id: '09876',
        role: {
          label: '',
        },
      },
      hostChannel: '54321',
      prayerChannel: '12345',
      cancelled: false,
    }).toPromise();

    expect(mockAcceptPrayer).toBeCalledWith('12345', '67890', 'James T. Kirk');
    expect(dispatched).toEqual([{type: PUBLISH_ACCEPTED_PRAYER_REQUEST_FAILED, error: 'Broken'}]);
  });
});
