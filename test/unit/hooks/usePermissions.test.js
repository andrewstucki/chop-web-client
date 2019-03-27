import { renderHook } from 'react-hooks-testing-library';
import { usePermissions } from '../../../src/hooks/usePermissions';
import type { PrivateUserType } from '../../../src/feed/dux';

describe('usePermissions', () => {
  const user:PrivateUserType = {
    id: '12345',
    name: 'name',
    pubnubToken: '123',
    role: {
      label: 'HOST',
      permissions: [
        'event.host_notes.read',
        'feed.user.mute',
      ],
    },
  };

  const user2:PrivateUserType = {
    id: '12345',
    name: 'name',
    pubnubToken: '123',
    role: {
      label: '',
      permissions: [],
    },
  };

  test('It returns true when the user has the correct permissions', () => {
    const { result } = renderHook(() => usePermissions(user, ['feed.user.mute']));
    expect(result.current).toBeTruthy();
  });

  test('It returns false when the user has incorrect permissions', () => {
    const { result } = renderHook(() => usePermissions(user, ['feed.message.delete']));
    expect(result.current).toBeFalsy();
  });

  test('It handles the requireAll parameter with correct permissions', () => {
    const { result } = renderHook(() => usePermissions(user, ['event.host_notes.read', 'feed.user.mute'], true));
    expect(result.current).toBeTruthy();
  });

  test('It handles the requireAll parameter with incorrect permissions', () => {
    const { result } = renderHook(() => usePermissions(user, ['event.host_notes.read', 'feed.user.mute', 'feed.user.delete'], true));
    expect(result.current).toBeFalsy();
  });

  test('It handles a user with no permissions', () => {
    const { result } = renderHook(() => usePermissions(user2, ['feed.message.delete']));
    expect(result.current).toBeFalsy();
  });

  test('It handles empty requiredPermissions', () => {
    const { result } = renderHook(() => usePermissions(user2, []));
    expect(result.current).toBeFalsy();
  });
});
