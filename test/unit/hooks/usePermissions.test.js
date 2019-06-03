import { renderHook } from 'react-hooks-testing-library';
import { usePermissions } from '../../../src/hooks/usePermissions';
import type { PrivateSubscriberType } from '../../../src/feed/dux';

describe('usePermissions', () => {
  const subscriber:PrivateSubscriberType = {
    id: '12345',
    name: 'name',
    role: {
      label: 'HOST',
      permissions: [
        'event.host_notes.read',
        'feed.subscriber.mute',
      ],
    },
  };

  const subscriber2:PrivateSubscriberType = {
    id: '12345',
    name: 'name',
    role: {
      label: '',
      permissions: [],
    },
  };

  test('It returns true when the subscriber has the correct permissions', () => {
    const { result } = renderHook(() => usePermissions(subscriber, ['feed.subscriber.mute']));
    expect(result.current).toBeTruthy();
  });

  test('It returns false when the subscriber has incorrect permissions', () => {
    const { result } = renderHook(() => usePermissions(subscriber, ['feed.message.delete']));
    expect(result.current).toBeFalsy();
  });

  test('It handles the requireAll parameter with correct permissions', () => {
    const { result } = renderHook(() => usePermissions(subscriber, ['event.host_notes.read', 'feed.subscriber.mute'], true));
    expect(result.current).toBeTruthy();
  });

  test('It handles the requireAll parameter with incorrect permissions', () => {
    const { result } = renderHook(() => usePermissions(subscriber, ['event.host_notes.read', 'feed.subscriber.mute', 'feed.subscriber.delete'], true));
    expect(result.current).toBeFalsy();
  });

  test('It handles a subscriber with no permissions', () => {
    const { result } = renderHook(() => usePermissions(subscriber2, ['feed.message.delete']));
    expect(result.current).toBeFalsy();
  });

  test('It handles empty requiredPermissions', () => {
    const { result } = renderHook(() => usePermissions(subscriber2, []));
    expect(result.current).toBeFalsy();
  });
});
