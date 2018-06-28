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
  active: boolean,
  action: () => void,
};

// Action Creators

const acceptPrayerRequest = () => (
  {
    // TODO build this action
  }
);

const publishPrayerRequestNotification = (name: string, active: boolean) => (
  {
    type: PUBLISH_MOMENT_TO_CHANNEL,
    channel: 'host',
    moment: {
      type: ACTIONABLE_NOTIFICATION,
      notificationType: PRAYER_REQUEST,
      name,
      active,
      timeStamp: formatAMPM(new Date),
      action: acceptPrayerRequest,
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
  acceptPrayerRequest,
};

export {
  PRAYER_REQUEST,
  ACTIONABLE_NOTIFICATION,
};
