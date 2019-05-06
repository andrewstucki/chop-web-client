import { mutedNotificationBanner, warningNotificationBanner, errorNotificationBanner, textModeNotificationBanner } from '../../src/banner/dux';

describe('Banner Action Creators', () => {
  test('Mute notification', () => {
    expect(mutedNotificationBanner('guest')).toEqual({
      bannerType: 'MUTED_NOTIFICATION',
      message: 'guest',
      type: 'SET_NOTIFICATION_BANNER',
    });
  });

  test('Warning banner', () => {
    expect(warningNotificationBanner('warning message')).toEqual({
      bannerType: 'WARNING',
      message: 'warning message',
      type: 'SET_NOTIFICATION_BANNER',
    });
  });

  test('Error banner', () => {
    expect(errorNotificationBanner('error message')).toEqual({
      bannerType: 'ERROR',
      message: 'error message',
      type: 'SET_NOTIFICATION_BANNER',
    });
  });

  test('Text mode banner', () => {
    expect(textModeNotificationBanner('COMPACT')).toEqual({
      bannerType: 'TEXT_MODE_NOTIFICATION',
      message: 'COMPACT',
      type: 'SET_NOTIFICATION_BANNER',
    });
  });
});
