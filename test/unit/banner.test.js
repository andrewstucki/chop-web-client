import { mutedNotificationBanner, warningNotificationBanner, errorNotificationBanner } from '../../src/banner/dux';

describe('Banner Action Creators', () => {
  test('Mute notification', () => {
    expect(mutedNotificationBanner('guest')).toEqual({
      bannerType: 'notification',
      message: 'guest',
      type: 'SET_NOTIFICATION_BANNER',
    });
  });

  test('Warning banner', () => {
    expect(warningNotificationBanner('warning message')).toEqual({
      bannerType: 'warning',
      message: 'warning message',
      type: 'SET_NOTIFICATION_BANNER',
    });
  });

  test('Error banner', () => {
    expect(errorNotificationBanner('error message')).toEqual({
      bannerType: 'error',
      message: 'error message',
      type: 'SET_NOTIFICATION_BANNER',
    });
  });
});
