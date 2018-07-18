// @flow
import type { UserType } from '../../feed/dux';
import { PUBLISH_MOMENT_TO_CHANNEL } from '../dux';
import { formatAMPM } from '../notification/dux';
import { createUid } from '../../util';

// Type Definitions

const ACTIONABLE_NOTIFICATION = 'ACTIONABLE_NOTIFICATION';
const PRAYER_REQUEST = 'PRAYER_REQUEST';

type ActionableNotificationType =
  | PrayerRequestNotificationType;

type PrayerRequestNotificationType = {
  type: 'ACTIONABLE_NOTIFICATION',
  notificationType: 'PRAYER_REQUEST',
  id: string,
  user: UserType,
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

const publishPrayerRequestNotification = (user: UserType, active: boolean) => (
  {
    type: PUBLISH_MOMENT_TO_CHANNEL,
    channel: 'host',
    moment: {
      type: ACTIONABLE_NOTIFICATION,
      notificationType: PRAYER_REQUEST,
      id: createUid(),
      user,
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
