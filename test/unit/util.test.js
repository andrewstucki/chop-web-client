// @flow
import  {
  getFirstInitial,
  parseUserNames,
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

  test('parseUserNames', () => {
    const result = parseUserNames('[[Biffle]] started chat with [[Baffle]]');
    expect(result).toBe('Biffle started chat with Baffle');
  });
});
