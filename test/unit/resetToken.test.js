import {getResetToken} from '../../src/io/resetToken';

describe('ResetToken', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

  beforeEach(() => {
    delete global.location;
    global.location = { search: '' };
  });

  test('Returns nothing when no token exsists', () => {
    expect(getResetToken()).toEqual(null);
  });

  test('Returns token from query string', () => {
    delete global.location;
    global.location = { search: `?reset_token=${token}` };
    expect(getResetToken()).toEqual(token);
  });
});