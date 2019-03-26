// @flow
import queries, { setAccessToken } from '../../../src/io/queries';
import { authenticateByBasicAuth, authenticateByToken } from '../../../src/io/saga';
import { runSaga } from 'redux-saga';
import { BASIC_AUTH_LOGIN, BASIC_AUTH_LOGIN_FAILED } from '../../../src/login/dux';
import {
  setAuthentication,
  queryCurrentEvent,
  TOKEN_AUTH_LOGIN_FAILED,
} from '../../../src/feed/dux';
import { mockDate } from '../../testUtils';
import { REHYDRATE } from 'redux-persist/lib/constants';
import {getLegacyToken} from '../../../src/io/legacyToken';

jest.mock('../../../src/io/queries');
jest.mock('../../../src/io/legacyToken');
const mock = (mockFn: any) => mockFn;

describe('Test Auth', () => {
  const mockAuthenticateByBasicAuth = mock(queries.authenticateByBasicAuth);
  const mockAuthenticateByRefreshToken = mock(queries.authenticateByRefreshToken);
  const mockAuthenticateByLegacyToken = mock(queries.authenticateByLegacyToken);
  const mockGetLegacyToken = mock(getLegacyToken);
  test('Basic Auth success', async () => {
    mockDate(1553266446136);
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    },
    authenticateByBasicAuth,
    { type: BASIC_AUTH_LOGIN, email: 'joe@test.com', password: '12345' },
    ).toPromise();

    expect(mockAuthenticateByBasicAuth).toBeCalledWith('joe@test.com', '12345');
    expect(dispatched).toEqual([
      setAuthentication('1234567890', '0987654321'),
      queryCurrentEvent(),
    ]);
  });

  test('Basic Auth fail', async () => {
    mockAuthenticateByBasicAuth.mockImplementation(() => {
      throw new Error('Broken');
    });
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    },
    authenticateByBasicAuth,
    { type: BASIC_AUTH_LOGIN, email: 'joe@test.com', password: '12345' },
    ).toPromise();

    expect(mockAuthenticateByBasicAuth).toBeCalledWith('joe@test.com', '12345');
    expect(dispatched).toEqual([{type: BASIC_AUTH_LOGIN_FAILED, error: 'Broken'}]);
  });

  test('Auth with access token success', async () => {
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
      getState: () => (
        {
          feed: {
            auth: {
              accessToken: '123456',
            },
          },
        }
      ),
    },
    authenticateByToken,
    { type: REHYDRATE }).toPromise();

    expect(setAccessToken).toBeCalledWith('123456');
    expect(dispatched).toEqual([queryCurrentEvent()]);
  });

  test('Auth with refresh token success', async () => {
    mockAuthenticateByRefreshToken.mockResolvedValue(
      {
        authenticate: {
          accessToken: '1234567890',
          refreshToken: '0987654321',
        },
      }
    );
    const dispatched = [];
    const mockDispatch: (action: any) => void = jest.fn();
    mockDispatch.mockImplementationOnce(() => {
      throw new Error('Broken');
    });
    mockDispatch.mockImplementation(action => dispatched.push(action));

    await runSaga({
      dispatch: mockDispatch,
      getState: () => (
        {
          feed: {
            auth: {
              accessToken: '123456',
              refreshToken: '098765',
            },
          },
        }
      ),
    },
    authenticateByToken,
    { type: REHYDRATE }).toPromise();

    expect(mockAuthenticateByRefreshToken).toBeCalledWith('098765');
    expect(dispatched).toEqual([
      setAuthentication('1234567890', '0987654321'),
      queryCurrentEvent(),
    ]);
  });

  test('Auth with legacy token success', async () => {
    mockAuthenticateByLegacyToken.mockResolvedValue(
      {
        authenticate: {
          accessToken: '1234567890',
          refreshToken: '0987654321',
        },
      }
    ).mockClear();
    mockGetLegacyToken.mockReturnValue('10293847856');
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
      getState: () => ({}),
    },
    authenticateByToken,
    { type: REHYDRATE }).toPromise();

    expect(mockAuthenticateByLegacyToken).toBeCalledWith('10293847856');
  });

  test('Auth by token failed', async () => {
    mockGetLegacyToken.mockImplementation(() => {
      throw new Error('Broken');
    });
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
      getState: () => ({}),
    },
    authenticateByToken,
    { type: REHYDRATE }).toPromise();

    expect(dispatched).toEqual([{type: TOKEN_AUTH_LOGIN_FAILED, error: 'Broken'}]);
  });
});