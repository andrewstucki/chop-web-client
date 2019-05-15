import reducer, {
  defaultState,
  setUser,
  setAvatar,
  getCurrentUserAvatar,
  updateUserSucceeded,
  getTextMode,
} from '../../src/users/dux';
import { COMPACT } from '../../src/textModeToggle/dux';

import type { PrivateUserType } from '../../src/users/dux';

describe('User Reducer Tests', () => {
  const currentUser: PrivateUserType = {
    id: 12345,
    pubnubToken: '09876',
    pubnubAccessKey: '67890',
    avatar: null,
    name: 'Joan Jet',
    role: {
      label: '',
      permissions: [],
    },
    preferences: {
      textMode: 'COMPACT',
    },
  };

  test('Accepts a user', () => {
    const user = reducer(defaultState, setUser(currentUser));
    expect(user).toEqual(
      {
        ...defaultState,
        currentUser: currentUser,
      },
    );
  });

  test('Avatar', () => {
    const state = reducer(defaultState, setAvatar('avatar_url'));
    expect(getCurrentUserAvatar(state)).toEqual('avatar_url');
  });

  test('Update User Success', () => {
    const state = reducer(defaultState, updateUserSucceeded(currentUser));
    expect(getTextMode(state)).toEqual(COMPACT);
  });
});