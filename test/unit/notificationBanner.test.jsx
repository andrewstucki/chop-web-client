// @flow
import React from 'react';
import { defaultState } from '../../src/chop/dux';
import Banner from '../../src/banner';
import { renderWithReduxAndTheme } from '../testUtils';
import { fireEvent } from '@testing-library/react';

describe('NotificationBanner test', () => {
  test('Notification banner is removed on dismiss', () => {
    const { getByTestId, store } = renderWithReduxAndTheme(
      <Banner />,
      {
        ...defaultState,
        feed: {
          ...defaultState.feed,
          notificationBanner: {
            type: 'MUTED',
            name: 'G. Boole',
          },
        },
      },
    );
    expect(getByTestId('muted-notification-banner')).toBeTruthy();
    fireEvent.click(getByTestId('banner-dismiss-button'));
    expect(store.getState().feed.notificationBanner).toEqual(
      {},
    );
  });

  test('Text mode banner displays', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Banner />,
      {
        feed: {
          ...defaultState,
          notificationBanner: {
            type: 'TEXT_MODE',
            mode: 'COMPACT',
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
            type: 'ERROR',
            error: 'There was an error.',
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
            type: 'WARNING',
            warning: 'This is a warning.',
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
