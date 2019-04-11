// @flow
import queries from '../../../src/io/queries';
import {directChat} from '../../../src/io/saga';
import { runSaga } from 'redux-saga';
import {
  DIRECT_CHAT,
  DIRECT_CHAT_FAILED,
} from '../../../src/moment/message/dux';
import {ADD_CHANNEL} from '../../../src/feed/dux';
import {mockDate} from '../../testUtils';

jest.mock('../../../src/io/queries');
const mock = (mockFn: any) => mockFn;

describe('Test Direct Chat', () => {
  const mockDirectChat = mock(queries.directChat);
  test('Direct Chat user success', async () => {
    mockDate(1553266446136);
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, directChat,
    {type: DIRECT_CHAT, otherUserPubnubToken: '12345', otherUserNickname: 'James T. Kirk'}).toPromise();

    expect(mockDirectChat).toBeCalledWith('12345', 'James T. Kirk');
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
              name: 'Fred',
              pubnubToken: '4321',
              role: { label: '' },
            },
            {
              id: '456',
              avatar: null,
              name: 'Barny',
              pubnubToken: '5432',
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
            channelId: '67890',
          },
          type: 'CHAT',
        },
        type: 'SET_PANE_CONTENT',
      },
    ]);
  });

  test('Direct Chat user failure', async () => {
    mockDirectChat.mockImplementation(() => {
      throw new Error('Broken');
    });
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, directChat,
    {type: DIRECT_CHAT, otherUserPubnubToken: '12345', otherUserNickname: 'James T. Kirk'}).toPromise();

    expect(mockDirectChat).toBeCalledWith('12345', 'James T. Kirk');
    expect(dispatched).toEqual([
      {
        type: DIRECT_CHAT_FAILED,
        error: 'Broken',
      },
    ]);
  });
});
