// @flow
import queries from '../../../src/io/queries';
import { joinChannel as joinChannelSaga } from '../../../src/io/saga';
import { ADD_CHANNEL, joinChannel as joinChannelAction, JOIN_CHANNEL_FAILED } from '../../../src/feed/dux';
import { runSaga } from 'redux-saga';
import { mockDate } from '../../testUtils';

jest.mock('../../../src/io/queries');
const mock = (mockFn: any) => mockFn;

describe('Test join channel', () => {
  const mockJoinChannel = mock(queries.joinChannel);
  test('Join channel success', async () => {
    mockDate(1553266446136);
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, joinChannelSaga,
    joinChannelAction('12345', '456789', 'JarJar')).toPromise();

    expect(mockJoinChannel).toBeCalledWith('12345', '456789', 'JarJar');
    expect(dispatched).toEqual([
      {
        type: ADD_CHANNEL,
        channel: {
          direct: true,
          placeholder: false,
          id: '67890',
          name: null,
          anchorMoments: [],
          moments: [],
          participants: [
            {
              id: '123',
              avatar: null,
              name: 'Kilo',
              pubnubToken: '4321',
              role: { label: '' },
            },
            {
              id: '456',
              avatar: null,
              name: 'Darth',
              pubnubToken: '5432',
              role: { label: '' },
            },
          ],
          scrollPosition: 0,
          sawLastMomentAt: 1553266446136,
        },
      },
    ]);
  });

  test('Direct Chat user failure', async () => {
    mockJoinChannel.mockImplementation(() => {
      throw new Error('Broken');
    });
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, joinChannelSaga,
    joinChannelAction('12345', '456789', 'JarJar')).toPromise();

    expect(mockJoinChannel).toBeCalledWith('12345', '456789', 'JarJar');
    expect(dispatched).toEqual([
      {
        type: JOIN_CHANNEL_FAILED,
        error: 'Broken',
      },
    ]);
  });
});
