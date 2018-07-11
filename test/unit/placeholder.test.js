// @flow
import reducer, {
  defaultState,
  placeholderContents,
  getCurrentChannel,
} from '../../src/placeholder/dux';

import {
  publishSalvation,
  releaseAnchorMoment,
  SET_ANCHOR_MOMENT,
} from '../../src/placeholder/anchorMoment/dux';

describe('PlaceHolder tests', () => {
  test('Default state', () => {
    const result = reducer(defaultState);
    expect(result).toEqual(defaultState);
  });

  test('Publish salvation anchorMoment 1 hand raised', () => {
    const result = reducer(defaultState, publishSalvation(1));
    expect(result.placeholder.subText).toBe('1 hand raised');
  });

  test('Publish salvation anchorMoment multiple hands raised', () => {
    const result = reducer(defaultState, publishSalvation(4));
    expect(result.placeholder.subText).toBe('4 hands raised');
  });

  test('Sets salvation anchor moment', () => {
    const result = reducer(
      defaultState,
      {
        type: SET_ANCHOR_MOMENT,
        anchorMoment: {
          type: 'ANCHOR_MOMENT',
          id: '12345',
          text: 'I commit my life to Christ.',
          subText: '1 hand raised',
          anchorMomentAnchored: true,
        },
      }
    );
    expect(result.renderPlaceholder).toBe(true);
    expect(result.placeholder).toEqual(
      {
        type: 'ANCHOR_MOMENT',
        id: '12345',
        text: 'I commit my life to Christ.',
        subText: '1 hand raised',
        anchorMomentAnchored: true,
      }
    );
  });

  test('Release anchor moment', () => {
    const result = reducer(
      {
        ...defaultState,
        renderPlaceholder: true,
        placeholder: {
          type: 'ANCHOR_MOMENT',
          id: '12345',
          text: 'I commit my life to Christ.',
          subText: '1 hand raised',
          anchorMomentAnchored: true,
        },
      },
      releaseAnchorMoment()
    );
    expect(result).toEqual(defaultState);
  });

  test('Get anchor moment', () => {
    const result = placeholderContents(
      {
        ...defaultState,
        renderPlaceholder: true,
        placeholder: {
          type: 'ANCHOR_MOMENT',
          id: '12345',
          text: 'I commit my life to Christ.',
          subText: '1 hand raised',
          anchorMomentAnchored: true,
        },
      }
    );
    expect(result).toEqual(
      {
        type: 'ANCHOR_MOMENT',
        id: '12345',
        text: 'I commit my life to Christ.',
        subText: '1 hand raised',
        anchorMomentAnchored: true,
      }
    );
  });

  test('Get current channel', () => {
    const result = getCurrentChannel(
      {
        channels: {
          public: [],
          host: [],
        },
        currentChannel: 'host',
        chatInput: '',
        currentUser: {
          id: '',
          nickname: '',
        },
        appendingMessage: false,
        anchorMoment: {
          type: 'ANCHOR_MOMENT',
          id: '',
          text: '',
          subText: '',
          anchorMomentAnchored: true,
        },
        renderingAnchorMoment: false,
        placeholderPresent: true,
      }
    );
    expect(result).toEqual('host');
  });
});
