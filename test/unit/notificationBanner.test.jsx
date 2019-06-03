// @flow
import React from 'react';
import { defaultState } from '../../src/chop/dux';
import Banner from '../../src/banner';
import { renderWithReduxAndTheme } from '../testUtils';
import { fireEvent } from 'react-testing-library';

describe('NotificationBanner test', () => {
  test('Notification banner is removed on dismiss', () => {
    const { getByTestId, store } = renderWithReduxAndTheme(
      <Banner />,
      {
        ...defaultState,
        feed: {
          ...defaultState.feed,
          notificationBanner: {
            message: 'G. Boole',
            bannerType: 'MUTED_NOTIFICATION',
          },
        },
      },
    );
    expect(getByTestId('muted-notification-banner')).toBeTruthy();
    fireEvent.click(getByTestId('banner-dismiss-button'));
    expect(store.getState().feed.notificationBanner).toEqual(
      {
        message: '',
        bannerType: '',
      },
    );
  });

  test('Text mode banner displays', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Banner />,
      {
        feed: {
          ...defaultState,
          notificationBanner: {
            message: 'COMPACT',
            bannerType: 'TEXT_MODE_NOTIFICATION',
          },
        },
      },
    );
    expect(getByTestId('text-mode-notification-banner')).toBeTruthy();
    expect(getByTestId('banner-message').textContent).toEqual(
      'text_mode_updated'
    );
  });

  test('Error banner displays', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Banner />,
      {
        feed: {
          ...defaultState,
          notificationBanner: {
            message: 'There was an error.',
            bannerType: 'ERROR',
          },
        },
      },
    );
    expect(getByTestId('error-banner')).toBeTruthy();
    expect(getByTestId('banner-message').textContent).toEqual(
      'There was an error.'
    );
  });

  test('Warning banner displays', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Banner />,
      {
        feed: {
          ...defaultState,
          notificationBanner: {
            message: 'This is a warning.',
            bannerType: 'WARNING',
          },
        },
      },
    );
    expect(getByTestId('warning-banner')).toBeTruthy();
    expect(getByTestId('banner-message').textContent).toEqual(
      'This is a warning.'
    );
  });
});
