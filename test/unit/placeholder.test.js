// @flow
import reducer, {
  defaultState,
  getRaisedHandCount,
} from '../../src/placeholder/dux';

import {
  publishCallToChrist,
  releaseAnchorMoment,
} from '../../src/placeholder/anchorMoment/dux';

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

  test('Release anchor moment', () => {
    const result = reducer(
      {
        ...defaultState,
        renderPlaceholder: true,
        placeholder: [
          {
            type: 'ANCHOR_MOMENT',
            anchorMomentType: 'CALL_TO_CHRIST',
            id: '12345',
            text: 'Would you like to give your life to Christ?',
            subText: '1 hand raised',
            showReleaseAnchorButton: true,
          },
        ],
      },
      releaseAnchorMoment(
        {
          type: 'ANCHOR_MOMENT',
          anchorMomentType: 'CALL_TO_CHRIST',
          id: '12345',
          text: 'Would you like to give your life to Christ?',
          subText: '1 hand raised',
          showReleaseAnchorButton: true,
        }
      )
    );
    expect(result.renderPlaceholder).toBe(false);
    expect(result.placeholder.length).toBe(0);
  });
});
