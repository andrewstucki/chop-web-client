import reducer, {
  defaultState,
  setSubscriber,
  setAvatar,
  getCurrentSubscriberAvatar,
  updateSubscriberSucceeded,
  getTextMode,
} from '../../src/subscriber/dux';
import { COMPACT } from '../../src/textModeToggle/dux';

import type { PrivateSubscriberType } from '../../src/subscriber/dux';

describe('Subscriber Reducer Tests', () => {
  const currentSubscriber: PrivateSubscriberType = {
    id: 12345,
    pubnubAccessKey: '67890',
    avatar: null,
    nickname: 'Joan Jet',
    role: {
      label: '',
      permissions: [],
    },
    preferences: {
      textMode: 'COMPACT',
    },
  };

  test('Accepts a subscriber', () => {
    const subscriber = reducer(defaultState, setSubscriber(currentSubscriber));
    expect(subscriber).toEqual(
      {
        ...defaultState,
        currentSubscriber: currentSubscriber,
      },
    );
  });

  test('Avatar', () => {
    const state = reducer(defaultState, setAvatar('avatar_url'));
    expect(getCurrentSubscriberAvatar(state)).toEqual('avatar_url');
  });

  test('Update Subscriber Success', () => {
    const state = reducer(defaultState, updateSubscriberSucceeded({
      preferences: {
        textMode: 'COMPACT',
      },
    }));
    expect(getTextMode(state)).toEqual(COMPACT);
  });
});
