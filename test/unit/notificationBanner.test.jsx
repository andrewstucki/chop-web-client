// @flow
import React from 'react';
import { defaultState } from '../../src/chop/dux';
import Banner from '../../src/banner';
import { renderWithReduxAndTheme } from '../testUtils';
import { fireEvent } from '@testing-library/react';
import { errorBanner, mutedBanner, textModeBanner, warningBanner } from '../../src/banner/dux';

describe('NotificationBanner test', () => {
  test('Notification banner is removed on dismiss', () => {
    const realMutedBanner = mutedBanner('G. Boole');
    const { getByTestId, store } = renderWithReduxAndTheme(
      <Banner />,
      {
        ...defaultState,
        feed: {
          ...defaultState.feed,
          notificationBanner: realMutedBanner.banner,
        },
      },
    );
    expect(getByTestId('muted-notification-banner')).toBeTruthy();
    fireEvent.click(getByTestId('banner-dismiss-button'));
    expect(store.getState().feed.notificationBanner).toEqual(
      defaultState.feed.notificationBanner,
    );
  });

  test('Text mode banner displays', () => {
    const realTextModeBanner = textModeBanner('COMPACT');
    const { getByTestId } = renderWithReduxAndTheme(
      <Banner />,
      {
        feed: {
          ...defaultState,
          notificationBanner: realTextModeBanner.banner,
        },
      },
    );
    expect(getByTestId('INFO-banner')).toBeTruthy();
    expect(getByTestId('banner-message').textContent).toEqual(
      'text_mode_updated'
    );
  });

  test('Error banner displays', () => {
    const realErrorBanner = errorBanner('There was an error.');
    const { getByTestId } = renderWithReduxAndTheme(
      <Banner />,
      {
        feed: {
          ...defaultState,
          notificationBanner: realErrorBanner.banner,
        },
      },
    );
    expect(getByTestId('ERROR-banner')).toBeTruthy();
    expect(getByTestId('banner-message').textContent).toEqual(
      'There was an error.'
    );
  });

  test('Warning banner displays', () => {
    const realWarningBanner = warningBanner('This is a warning.');
    const { getByTestId } = renderWithReduxAndTheme(
      <Banner />,
      {
        feed: {
          ...defaultState,
          notificationBanner: realWarningBanner.banner,
        },
      },
    );
    expect(getByTestId('WARNING-banner')).toBeTruthy();
    expect(getByTestId('banner-message').textContent).toEqual(
      'This is a warning.'
    );
  });
});
