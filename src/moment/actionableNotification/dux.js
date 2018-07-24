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
};

// Action Creators

const publishPrayerRequestNotification = (user: UserType) => (
  {
    type: PUBLISH_MOMENT_TO_CHANNEL,
    channel: 'host',
    moment: {
      type: ACTIONABLE_NOTIFICATION,
      notificationType: PRAYER_REQUEST,
      id: createUid(),
      user,
      active: true,
      timeStamp: formatAMPM(new Date),
    },
  }
);

// Reducer

const reducer = (
  state: Object = {},
  action?: ActionableNotificationType) => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
  default:
    return state;
  }
};

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

export default reducer;
