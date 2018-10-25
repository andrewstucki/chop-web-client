// @flow
import type { SharedUserType } from '../../feed/dux';
import type { PublishMomentToChannelType } from '../dux';
import { PUBLISH_MOMENT_TO_CHANNEL } from '../dux';
import { formatAMPM } from '../notification/dux';
import { createUid } from '../../util';

// Action Types

const ACTIONABLE_NOTIFICATION = 'ACTIONABLE_NOTIFICATION';
const PRAYER_REQUEST = 'PRAYER_REQUEST';
const PUBLISH_ACCEPTED_PRAYER_REQUEST = 'PUBLISH_ACCEPTED_PRAYER_REQUEST';

// Flow Type Definitions

type PrayerRequestNotificationType = {
  type: 'ACTIONABLE_NOTIFICATION',
  notificationType: 'PRAYER_REQUEST',
  id: string,
  user: SharedUserType,
  timeStamp: string,
  active: boolean,
  channel: string,
};

type ActionableNotificationType =
  | PrayerRequestNotificationType;

type PublishAcceptedPrayerRequestType = {
  type: 'PUBLISH_ACCEPTED_PRAYER_REQUEST',
  id: string,
  channel: string,
};

// Action Creators

const publishPrayerRequestNotification = (
  user: SharedUserType,
  prayerChannel: string,
  hostChannel: string,
): PublishMomentToChannelType => (
  {
    type: PUBLISH_MOMENT_TO_CHANNEL,
    channel: hostChannel,
    moment: {
      type: ACTIONABLE_NOTIFICATION,
      notificationType: PRAYER_REQUEST,
      id: createUid(),
      user,
      active: true,
      timeStamp: formatAMPM(new Date),
      prayerChannel,
    },
  }
);

const publishAcceptedPrayerRequest = (
  id: string,
  channel: string
): PublishAcceptedPrayerRequestType => (
  {
    type: PUBLISH_ACCEPTED_PRAYER_REQUEST,
    id,
    channel,
  }
);

// Exports

export type {
  ActionableNotificationType,
  PrayerRequestNotificationType,
  PublishAcceptedPrayerRequestType,
};

export {
  publishPrayerRequestNotification,
  publishAcceptedPrayerRequest,
};

export {
  PRAYER_REQUEST,
  ACTIONABLE_NOTIFICATION,
  PUBLISH_ACCEPTED_PRAYER_REQUEST,
};
