// @flow
import { logout } from '../../../src/sideMenu/dux';
import reducer from '../../../src/io/session/dux';

describe('Session', () => {
  test('reducer with no values', () => {
    const result = reducer();
    expect(result).toEqual({});
  });

  test('logout', () => {
    window.location.assign = jest.fn();
    const result = reducer(
      {},
      logout()
    );
    expect(window.location.assign)
      .toBeCalledWith('https://live.life.church/sessions/sign_out');
  });
});