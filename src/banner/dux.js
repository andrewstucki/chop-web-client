// @flow
import { SET_NOTIFICATION_BANNER } from '../feed/dux';
import type { SetNotificationBannerType } from '../feed/dux';

// Flow Type Definitions

type BannerType = {
  message: string,
  bannerType: string,
}

// Action Creators

const mutedNotificationBanner = (
  guestName: string,
): SetNotificationBannerType => (
  {
    type: SET_NOTIFICATION_BANNER,
    message: guestName,
    bannerType: 'notification',
  }
);

const errorNotificationBanner = (
  message: string,
): SetNotificationBannerType => (
  {
    type: SET_NOTIFICATION_BANNER,
    message,
    bannerType: 'error',
  }
);

// Exports

export {
  mutedNotificationBanner,
  errorNotificationBanner,
};

export type {
  BannerType,
};