// @flow
import  {
  getFirstInitial,
  getMessageTimestamp,
  validEmail,
} from '../../src/util';

describe('Util tests', () => {
  test('getFirstInitial', () => {
    const result = getFirstInitial('Billy Bob');
    expect(result).toBe('B');
  });

  test('getFirstInitial', () => {
    const result = getFirstInitial('joe-joe');
    expect(result).toBe('J');
  });

  test('getMessageTimestamp in past', () => {
    const result = getMessageTimestamp(new Date('2018-06-27 16:53:6 +0000').toString());
    expect(result).toMatch(/^(\d{1,2}):(\d{2})(\s*[ap]m?), (Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)\s+\d{1,2}$/i);
  });

  test('getMessageTimestamp today', () => {
    const today = new Date();
    const result = getMessageTimestamp(today.toString());
    expect(result).toMatch(/^(\d{1,2}):(\d{2})(\s*[ap]m?)$/i);
  });

  test('invalid email', () => {
    const email = 'joe.com';
    const result = validEmail(email);
    expect(result).toEqual(false);
  });

  test('valid email', () => {
    const email = 'joe@test.com';
    const result = validEmail(email);
    expect(result).toEqual(true);
  });
});
