// @flow
import { isOffline, isChatEnabled } from '../../src/selectors/eventSelectors';
import { defaultState } from '../../src/feed/dux';

describe('Offline Selector Tests', () => {
  test('Test online', () => {
    const store = {
      ...defaultState,
      event: {
        id: 320418,
        startTime: 1529425800000,
        title: 'When Pigs Fly - Week 2',
      },
    };
    const offline = isOffline(store);
    expect(offline).toEqual(false);
  });

  test('Test offline', () => {
    const store = {
      ...defaultState,
      event: {
        id: 0,
        startTime: 0,
        title: '',
      },
    };
    const offline = isOffline(store);
    expect(offline).toEqual(true);
  });

  test('Public chat enabled', () => {
    const store = {
      ...defaultState,
      event: {
        enabledFeatures: { chat: true },
      },
    };
    const chatEnabled = isChatEnabled(store);
    expect(chatEnabled).toEqual(true);
  });

  test('Public chat disabled', () => {
    const store = {
      ...defaultState,
      event: {
        enabledFeatures: { chat: null },
      },
    };
    const chatEnabled = isChatEnabled(store);
    expect(chatEnabled).toEqual(false);
  });
});
