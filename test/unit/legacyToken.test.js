import {getLegacyToken} from '../../src/io/legacyToken';

describe('LegacyToken', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

  beforeEach(() => {
    global.document.cookies = '';
    delete global.location;
    global.location = { search: '' };
  });

  test('Returns nothing when no token exsists', () => {
    expect(getLegacyToken()).toEqual('');
  });

  test('Returns token from cookie', () => {
    global.document.cookie = `legacy_token=${token}`;
    expect(getLegacyToken()).toEqual(token);
  });

  test('Returns token from query string', () => {
    delete global.location;
    global.location = { search: `?legacy_token=${token}` };
    expect(getLegacyToken()).toEqual(token);
  });
});