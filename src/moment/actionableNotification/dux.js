// @flow
import { PUBLISH_MOMENT_TO_CHANNEL } from '../dux';
import { formatAMPM } from '../notification/dux';

// Type Definitions

const ACTIONABLE_NOTIFICATION = 'ACTIONABLE_NOTIFICATION';
const PRAYER_REQUEST = 'PRAYER_REQUEST';

type ActionableNotificationType =
  | PrayerRequestNotificationType;

type PrayerRequestNotificationType = {
  type: 'ACTIONABLE_NOTIFICATION',
  notificationType: 'PRAYER_REQUEST',
  name: string,
  timeStamp: string,
};

// Action Creators

const publishPrayerRequestNotification = (name: string) => (
  {
    type: PUBLISH_MOMENT_TO_CHANNEL,
    channel: 'host',
    moment: {
      type: ACTIONABLE_NOTIFICATION,
      notificationType: PRAYER_REQUEST,
      name,
      timeStamp: formatAMPM(new Date),
    },
  }
);

// Exports

export type {
  ActionableNotificationType,
  PrayerRequestNotificationType,
};

export {
  publishPrayerRequestNotification,
};

export {
  PRAYER_REQUEST,
  ACTIONABLE_NOTIFICATION,
};
