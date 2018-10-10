// @flow
import  {
  getFirstInitial,
  getChannelByName,
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

  test('getChannelByName', () => {
    const result = getChannelByName({
      '12345': {
        id: '12345',
        name: 'Host',
        moments: [],
      },
      '67890': {
        id: '67890',
        name: 'Public',
        moments: [],
      },
    }, 'Host');

    expect(result).toBe('12345');
  });
});
