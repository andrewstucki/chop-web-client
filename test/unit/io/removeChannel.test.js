// @flow
import queries from '../../../src/io/queries';
import {removeChannel} from '../../../src/io/saga';
import { runSaga } from 'redux-saga';
import {REMOVE_CHANNEL, REMOVE_CHANNEL_FAILED, REMOVE_CHANNEL_SUCCEEDED} from '../../../src/feed/dux';

jest.mock('../../../src/io/queries');
const mock = (mockFn: any) => mockFn;

describe('Remove Channel', () => {
  const mockLeaveChannel = mock(queries.leaveChannel);
  test('Remove channel success', async () => {
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, removeChannel, {type: REMOVE_CHANNEL, channel: '12345'}).toPromise();

    expect(mockLeaveChannel).toBeCalledWith('12345');
    expect(dispatched).toEqual([{type: REMOVE_CHANNEL_SUCCEEDED}]);
  });


  test('Remove channel server returned false', async () => {
    mockLeaveChannel.mockResolvedValue({muteUser: false});
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, removeChannel, {type: REMOVE_CHANNEL, channel: '12345'}).toPromise();

    expect(mockLeaveChannel).toBeCalledWith('12345');
    expect(dispatched).toEqual([{type: REMOVE_CHANNEL_FAILED, error: 'Server returned false for leaveFeed'}]);
  });


  test('Remove channel server returned false', async () => {
    mockLeaveChannel.mockImplementation(() => {
      throw new Error('Broken');
    });

    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, removeChannel, {type: REMOVE_CHANNEL, channel: '12345'}).toPromise();

    expect(mockLeaveChannel).toBeCalledWith('12345');
    expect(dispatched).toEqual([{type: REMOVE_CHANNEL_FAILED, error: 'Broken'}]);
  });
});