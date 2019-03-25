// @flow
import queries from '../../../src/io/queries';
import { muteUser } from '../../../src/io/saga';
import { runSaga } from 'redux-saga';
import {PUBLISH_MUTE_USER, MUTE_USER_SUCCEEDED, MUTE_USER_FAILED} from '../../../src/moment';

jest.mock('../../../src/io/queries');
const mock = (mockFn: any) => mockFn;

describe('Test Mute User', () => {
  const mockMuteUser = mock(queries.muteUser);
  test('Mute user success', async () => {
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, muteUser, {type: PUBLISH_MUTE_USER, channelId: '12345', userName: 'James T. Kirk'}).toPromise();

    expect(mockMuteUser).toBeCalledWith('12345', 'James T. Kirk');
    expect(dispatched).toEqual([{type: MUTE_USER_SUCCEEDED, name: 'James T. Kirk'}]);
  });

  test('Mute user server returned false', async () => {
    mockMuteUser.mockResolvedValue({muteUser: false});
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, muteUser, {type: PUBLISH_MUTE_USER, channelId: '12345', userName: 'James T. Kirk'}).toPromise();

    expect(mockMuteUser).toBeCalledWith('12345', 'James T. Kirk');
    expect(dispatched).toEqual([{type: MUTE_USER_FAILED, name: 'James T. Kirk', error: 'Server returned false for muteUser: James T. Kirk'}]);
  });

  test('Mute user failure', async () => {
    mockMuteUser.mockImplementation(() => {
      throw new Error('Broken');
    });

    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, muteUser, {type: PUBLISH_MUTE_USER, channelId: '12345', userName: 'James T. Kirk'}).toPromise();

    expect(mockMuteUser).toBeCalledWith('12345', 'James T. Kirk');
    expect(dispatched).toEqual([{type: MUTE_USER_FAILED, name: 'James T. Kirk', error: 'Broken'}]);
  });
});