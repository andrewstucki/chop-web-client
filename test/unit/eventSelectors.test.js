// @flow
import { isOffline } from '../../src/selectors/eventSelectors';
import { defaultState } from '../../src/chop/dux';

describe('Offline Selector Tests', () => {
  test('Test online', () => {
    const store = {
      ...defaultState,
      feed: {
        ...defaultState.feed,
        event: {
          id: 320418,
          startTime: 1529425800000,
          title: 'When Pigs Fly - Week 2',
        },
      },
    };
    const offline = isOffline(store);
    expect(offline).toEqual(false);
  });

  test('Test offline', () => {
    const store = {
      ...defaultState,
      feed: {
        ...defaultState.feed,
        event: {
          id: 0,
          startTime: 0,
          title: '',
        },
      },
    };
    const offline = isOffline(store);
    expect(offline).toEqual(true);
  });
});