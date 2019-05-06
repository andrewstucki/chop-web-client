// @flow
import { SET_NOTIFICATION_BANNER } from '../feed/dux';
import type { SetNotificationBannerType } from '../feed/dux';

const MUTED_NOTIFICATION = 'MUTED_NOTIFICATION';
const ERROR = 'ERROR';
const WARNING = 'WARNING';
const TEXT_MODE_NOTIFICATION = 'TEXT_MODE_NOTIFICATION';

// Flow Type Definitions

type BannerType = {
  message: string,
  bannerType: BannerTypeType,
}

type BannerTypeType = 
  | typeof MUTED_NOTIFICATION
  | typeof ERROR
  | typeof WARNING
  | typeof TEXT_MODE_NOTIFICATION;
  

// Action Creators

const mutedNotificationBanner = (
  guestName: string,
): SetNotificationBannerType => (
  {
    type: SET_NOTIFICATION_BANNER,
    message: guestName,
    bannerType: MUTED_NOTIFICATION,
  }
);

const warningNotificationBanner = (
  message: string,
): SetNotificationBannerType => (
  {
    type: SET_NOTIFICATION_BANNER,
    message,
    bannerType: WARNING,
  }
);

const errorNotificationBanner = (
  message: string,
): SetNotificationBannerType => (
  {
    type: SET_NOTIFICATION_BANNER,
    message,
    bannerType: ERROR,
  }
);

const textModeNotificationBanner = (
  size: string,
): SetNotificationBannerType => (
  {
    type: SET_NOTIFICATION_BANNER,
    message: size,
    bannerType: TEXT_MODE_NOTIFICATION,
  }
);

// Exports

export {
  mutedNotificationBanner,
  errorNotificationBanner,
  warningNotificationBanner,
  textModeNotificationBanner,
};

export type {
  BannerType,
};

export {
  MUTED_NOTIFICATION,
  WARNING,
  ERROR,
  TEXT_MODE_NOTIFICATION,
};