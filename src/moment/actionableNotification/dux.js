// @flow
import type { SharedSubscriberType } from '../../subscriber/dux';
import type { ReceiveMomentType } from '../dux';
import { RECEIVE_MOMENT } from '../dux';
import { createUid, getMessageTimestamp } from '../../util';

// Action Types

const ACTIONABLE_NOTIFICATION = 'ACTIONABLE_NOTIFICATION';
const PRAYER_REQUEST = 'PRAYER_REQUEST';
const PUBLISH_ACCEPTED_PRAYER_REQUEST = 'PUBLISH_ACCEPTED_PRAYER_REQUEST';
const PUBLISH_ACCEPTED_PRAYER_REQUEST_FAILED = 'PUBLISH_ACCEPTED_PRAYER_REQUEST_FAILED';
const RECEIVE_ACCEPTED_PRAYER_REQUEST = 'RECEIVE_ACCEPTED_PRAYER_REQUEST';

// Flow Type Definitions

type PrayerRequestNotificationType = {
  type: 'ACTIONABLE_NOTIFICATION',
  notificationType: 'PRAYER_REQUEST',
  id: string,
  subscriber: SharedSubscriberType,
  timestamp: string,
  active: boolean,
  cancelled: boolean,
  prayerChannel: string,
};

type ActionableNotificationType =
  | PrayerRequestNotificationType;

type PublishAcceptedPrayerRequestType = {
  type: 'PUBLISH_ACCEPTED_PRAYER_REQUEST',
  prayerChannel: string,
  hostChannel: string,
  subscriberRequestingPrayer: SharedSubscriberType,
  cancelled: boolean,
};

type ReceiveAcceptedPrayerRequestType = {
  type: 'RECEIVE_ACCEPTED_PRAYER_REQUEST',
  prayerChannel: string,
  hostChannel: string,
};

// Action Creators

const receivePrayerRequestNotification = (
  subscriber: SharedSubscriberType,
  prayerChannel: string,
  hostChannel: string,
): ReceiveMomentType => (
  {
    type: RECEIVE_MOMENT,
    channel: hostChannel,
    moment: {
      type: ACTIONABLE_NOTIFICATION,
      notificationType: PRAYER_REQUEST,
      id: createUid(),
      subscriber,
      active: true,
      cancelled: false,
      timestamp: getMessageTimestamp(),
      prayerChannel,
    },
  }
);

const publishAcceptedPrayerRequest = (
  prayerChannel: string,
  hostChannel: string,
  subscriberRequestingPrayer: SharedSubscriberType,
  cancelled: boolean,
): PublishAcceptedPrayerRequestType => (
  {
    type: PUBLISH_ACCEPTED_PRAYER_REQUEST,
    prayerChannel,
    hostChannel,
    subscriberRequestingPrayer,
    cancelled,
  }
);

const receiveAcceptedPrayerRequest = (
  prayerChannel: string,
  hostChannel: string,
  cancelled: boolean,
): ReceiveAcceptedPrayerRequestType => (
  {
    type: RECEIVE_ACCEPTED_PRAYER_REQUEST,
    prayerChannel,
    hostChannel,
    cancelled,
  }
);

// Exports

export type {
  ActionableNotificationType,
  PrayerRequestNotificationType,
  PublishAcceptedPrayerRequestType,
  ReceiveAcceptedPrayerRequestType,
};

export {
  receivePrayerRequestNotification,
  publishAcceptedPrayerRequest,
  receiveAcceptedPrayerRequest,
};

export {
  PRAYER_REQUEST,
  ACTIONABLE_NOTIFICATION,
  PUBLISH_ACCEPTED_PRAYER_REQUEST,
  PUBLISH_ACCEPTED_PRAYER_REQUEST_FAILED,
  RECEIVE_ACCEPTED_PRAYER_REQUEST,
};
