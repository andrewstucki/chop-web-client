// @flow
import reducer, {
  defaultState,
  getRaisedHandCount,
} from '../../src/placeholder/dux';

import { publishCallToChrist } from '../../src/placeholder/anchorMoment/dux';

describe('PlaceHolder tests', () => {
  test('Default state', () => {
    const result = reducer(defaultState);
    expect(result).toEqual(defaultState);
  });

  test('Raised hand count', () => {
    const result = getRaisedHandCount(
      {
        ...defaultState,
        raisedHandCount: 1,
      }
    );
    expect(result).toEqual(1);
  });

  test('Sets call to Christ anchor moment', () => {
    const result = reducer(defaultState, publishCallToChrist('1 hand raised'));
    expect(result.renderPlaceholder).toBe(true);
    expect(result.placeholder.length).toBe(1);
    expect(result.placeholder[0].text).toBe(
      'Would you like to give your life to Christ?'
    );
    expect(result.placeholder[0].subText).toBe('1 hand raised');
    expect(result.placeholder[0].showReleaseAnchorButton).toBe(true);
  });
});
