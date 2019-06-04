// @flow
import { isOffline, isChatEnabled, defaultState } from '../../src/event/dux';

describe('Offline Selector Tests', () => {
  test('Test online', () => {
    const store = {
      event: {
        ...defaultState,
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
      event: defaultState,
    };
    const offline = isOffline(store);
    expect(offline).toEqual(true);
  });

  test('Public chat enabled', () => {
    const store = {
      event: {
        ...defaultState,
        enabledFeatures: { chat: true },
      },
    };
    const chatEnabled = isChatEnabled(store);
    expect(chatEnabled).toEqual(true);
  });

  test('Public chat disabled', () => {
    const store = {
      event: {
        ...defaultState,
        enabledFeatures: { chat: null },
      },
    };
    const chatEnabled = isChatEnabled(store);
    expect(chatEnabled).toEqual(false);
  });
});
