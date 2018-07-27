// @flow
import type { UserType } from '../../feed/dux';
import type { PublishMomentToChannelType } from '../dux';
import { PUBLISH_MOMENT_TO_CHANNEL } from '../dux';
import { formatAMPM } from '../notification/dux';
import { createUid } from '../../util';

// Type Definitions

const ACTIONABLE_NOTIFICATION = 'ACTIONABLE_NOTIFICATION';
const PRAYER_REQUEST = 'PRAYER_REQUEST';
const ACCEPT_PRAYER_REQUEST = 'ACCEPT_PRAYER_REQUEST';

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

type AcceptPrayerRequestType = {
  type: 'ACCEPT_PRAYER_REQUEST',
  id: string,
  channel: string,
};

// Action Creators

const publishPrayerRequestNotification = (
  user: UserType
): PublishMomentToChannelType => (
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

const acceptPrayerRequest = (id: string): AcceptPrayerRequestType => (
  {
    type: ACCEPT_PRAYER_REQUEST,
    id,
    channel: 'host',
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
  AcceptPrayerRequestType,
};

export {
  publishPrayerRequestNotification,
  acceptPrayerRequest,
};

export {
  PRAYER_REQUEST,
  ACTIONABLE_NOTIFICATION,
  ACCEPT_PRAYER_REQUEST,
};

export default reducer;
