// @flow
import {
  placeholderContents,
  getCurrentChannel,
  toggleAnchorMomentAnchored,
} from '../../src/placeholder/dux';

import { defaultState as defaultFeedState } from '../../src/feed/dux';

describe('PlaceHolder tests', () => {
  test('Get anchor moment', () => {
    const result = placeholderContents(
      {
        ...defaultFeedState,
        isPlaceholderPresent: true,
        anchorMoment: {
          type: 'ANCHOR_MOMENT',
          id: '12345',
          text: 'I commit my life to Christ.',
          subText: '1 hand raised',
        },
      }
    );
    expect(result).toEqual(
      {
        type: 'ANCHOR_MOMENT',
        id: '12345',
        text: 'I commit my life to Christ.',
        subText: '1 hand raised',
      }
    );
  });

  test('Set anchor moment anchored true', () => {
    const result = toggleAnchorMomentAnchored(
      {
        ...defaultFeedState,
        isPlaceholderPresent: false,
        anchorMoment: {
          type: 'ANCHOR_MOMENT',
          id: '12345',
          text: 'I commit my life to Christ.',
          subText: '1 hand raised',
        },
      }
    );
    expect(result).toEqual(true);
  });

  test('Set anchor moment anchored false', () => {
    const result = toggleAnchorMomentAnchored(
      {
        ...defaultFeedState,
        isPlaceholderPresent: false,
        anchorMoment: null,
      }
    );
    expect(result).toEqual(false);
  });

  test('Get current channel', () => {
    const result = getCurrentChannel(
      {
        ...defaultFeedState,
        currentChannel: 'host',
      }
    );
    expect(result).toEqual('host');
  });
});
