// @flow
import queries from '../../../src/io/queries';
import { updateUser as updateUserSaga } from '../../../src/io/sagas/user';
import { runSaga } from 'redux-saga';
import {
  UPDATE_USER_FAILED,
  updateUserSucceeded,
  updateTextMode,
  updateUser,
} from '../../../src/users/dux';
import { COMFORTABLE } from '../../../src/textModeToggle/dux';
import { textModeNotificationBanner } from '../../../src/banner/dux';

jest.mock('../../../src/io/queries');
const mock = (mockFn: any) => mockFn;

describe('Test Update User', () => {
  const mockUpdateUser = mock(queries.updateUser);
  test('Update user success', async () => {
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, updateUserSaga, updateUser('12345', updateTextMode(COMFORTABLE))).toPromise();

    expect(mockUpdateUser).toBeCalledWith('12345', {preferences: {textMode: COMFORTABLE}});
    expect(dispatched).toEqual(
      [
        updateUserSucceeded(
          {
            id: 128,
            name: 'Joe',
            avatar: null,
            pubnubToken: '6789',
            pubnubAccessKey: '1234',
            role: {
              label: '',
              permissions: [],
            },
            preferences: {
              textMode: COMFORTABLE,
            },
          }
        ),
        textModeNotificationBanner(COMFORTABLE),
      ]
    );
  });

  test('Update user fail', async () => {
    const dispatched = [];
    mockUpdateUser.mockResolvedValue(
      {
        updateUser: false,
      }
    );

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, updateUserSaga, updateUser('12345', updateTextMode(COMFORTABLE))).toPromise();

    expect(dispatched).toEqual(
      [
        {type: UPDATE_USER_FAILED, id: '12345', error: 'Server returned false for updateUser: 12345'},
      ]
    );
  });
});