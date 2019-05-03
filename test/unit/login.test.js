import { basicAuthLogin } from '../../src/login/dux';

describe('login action creators', () => {
  test('basic auth', () => {
    expect (basicAuthLogin('joe.test@testing.com', 'password')).toEqual({
      type: 'BASIC_AUTH_LOGIN',
      email: 'joe.test@testing.com',
      password: 'password',
    });
  });
});
