// @flow
import  {
  getFirstInitial,
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
});
