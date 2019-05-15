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
    expect(getByTestId('notification-banner')).toBeTruthy();
    fireEvent.click(getByTestId('banner-dismiss-button'));
    expect(store.getState().feed.notificationBanner).toEqual(
      {
        message: '',
        bannerType: '',
      },
    );
  });
});
