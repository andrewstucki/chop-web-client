// @flow
import {
  mutedBanner,
  warningBanner,
  errorBanner,
  textModeBanner,
  loggedInBanner,
  infoBanner,
} from '../../src/banner/dux';

describe('Banner Action Creators', () => {
  test('Mute notification', () => {
    expect(mutedBanner('guest')).toEqual({
      type: 'SET_BANNER',
      banner: {
        type: 'MUTED',
        key: 'subscriber_muted',
        variables: {
          name: 'guest',
        },
      },
    });
  });

  test('Info banner', () => {
    expect(infoBanner('info_message')).toEqual({
      type: 'SET_BANNER',
      banner: {
        type: 'INFO',
        key: 'info_message',
      },
    });
  });

  test('Warning banner', () => {
    expect(warningBanner('warning_message')).toEqual({
      type: 'SET_BANNER',
      banner: {
        type: 'WARNING',
        key: 'warning_message',
      },
    });
  });

  test('Error banner', () => {
    expect(errorBanner('error_message')).toEqual({
      type: 'SET_BANNER',
      banner: {
        type: 'ERROR',
        key: 'error_message',
      },
    });
  });

  test('Text mode banner', () => {
    expect(textModeBanner('COMPACT')).toEqual({
      type: 'SET_BANNER',
      banner: {
        type: 'INFO',
        key: 'text_mode_updated',
        variables: {
          mode: 'decreased',
        },
      },
    });
  });

  test('logged in banner', () => {
    expect(loggedInBanner()).toEqual({
      type: 'SET_BANNER',
      banner: {
        type: 'LOGGED_IN',
        key: 'logged_in',
      },
    });
  });
});
