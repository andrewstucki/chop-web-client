import { mutedBanner, warningBanner, errorBanner, textModeBanner, loggedInBanner } from '../../src/banner/dux';

describe('Banner Action Creators', () => {
  test('Mute notification', () => {
    expect(mutedBanner('guest')).toEqual({
      type: 'SET_BANNER',
      banner: {
        type: 'MUTED',
        name: 'guest',
      },
    });
  });

  test('Warning banner', () => {
    expect(warningBanner('warning message')).toEqual({
      type: 'SET_BANNER',
      banner: {
        type: 'WARNING',
        warning: 'warning message',
      },
    });
  });

  test('Error banner', () => {
    expect(errorBanner('error message')).toEqual({
      type: 'SET_BANNER',
      banner: {
        type: 'ERROR',
        error: 'error message',
      },
    });
  });

  test('Text mode banner', () => {
    expect(textModeBanner('COMPACT')).toEqual({
      type: 'SET_BANNER',
      banner: {
        type: 'TEXT_MODE',
        mode: 'COMPACT',
      },
    });
  });

  test('logged in banner', () => {
    expect(loggedInBanner()).toEqual({
      type: 'SET_BANNER',
      banner: {
        type: 'LOGGED_IN',
      },
    });
  });
});
