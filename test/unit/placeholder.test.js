// @flow
import reducer, {
  defaultState,
  placeholderContents,
  getCurrentChannel,
  setAnchorMomentAnchored,
} from '../../src/placeholder/dux';

import {
  publishSalvation,
  releaseAnchorMoment,
} from '../../src/placeholder/anchorMoment/dux';

import { defaultState as defaultFeedState } from '../../src/feed/dux';

describe('PlaceHolder tests', () => {
  test('Default state', () => {
    const result = reducer(defaultState);
    expect(result).toEqual(defaultState);
  });
  // TODO learn how to mock createUid
  test('Publish salvation anchorMoment 1 hand raised', () => {
    const result = reducer(defaultState, publishSalvation(1));
    expect(result.placeholder ? result.placeholder.subText : '')
      .toEqual('1 hand raised');
  });

  test('Publish salvation anchorMoment multiple hands raised', () => {
    const result = reducer(defaultState, publishSalvation(4));
    expect(result.placeholder ? result.placeholder.subText : '')
      .toBe('4 hands raised');
  });

  test('Sets salvation anchor moment', () => {
    const result = reducer(
      defaultState,
      {
        type: 'SET_ANCHOR_MOMENT',
        anchorMoment: {
          type: 'ANCHOR_MOMENT',
          id: '12345',
          text: 'I commit my life to Christ.',
          subText: '1 hand raised',
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

  test('Get current channel', () => {
    const result = getCurrentChannel(
      {
        ...defaultFeedState,
        channels: {
          public: {
            id: '12345',
            name: 'public',
            moments: [],
          },
          host: {
            id: '12345',
            name: 'host',
            moments: [],
          },
        },
        currentChannel: 'host',
        chatInput: '',
        currentUser: {
          id: '',
          nickname: '',
        },
        appendingMessage: false,
        anchorMoment: null,
        animatingMoment: false,
        placeholderPresent: true,
      }
    );
    expect(result).toEqual('host');
  });

  test('Set anchor moment anchored true', () => {
    const result = setAnchorMomentAnchored(
      {
        renderPlaceholder: false,
        placeholder: {
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
    const result = setAnchorMomentAnchored(
      {
        renderPlaceholder: false,
        placeholder: null,
      }
    );
    expect(result).toEqual(false);
  });
});
