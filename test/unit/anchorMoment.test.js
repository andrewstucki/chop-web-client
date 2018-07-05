// @flow
import reducer, {
  defaultState,
  getRaisedHandCount,
  publishCallToChrist,
} from '../../src/placeHolder/anchorMoment/dux';

describe('AnchorMoment tests', () => {
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

  // test('Publish a call to Christ 1 hand raised', () => {
  //   const result = reducer(
  //     {
  //       ...defaultState,
  //       raisedHandCount: 1,
  //     },
  //     publishCallToChrist(
  //       'Would you like to give your life to Chirst?',
  //       'hand raised',
  //       true
  //     ));
  //   expect(result).toEqual(
  //     {
  //       ...defaultState,
  //       raisedHandCount: 1,
  //       moment: {
  //         type: 'CALL_TO_CHRIST',
  //         text: 'Would you like to give your life to Chirst?',
  //         subText: 'hand raised',
  //         showReleaseAnchorButton: true,
  //       },
  //     }
  //   );
  // });
});
