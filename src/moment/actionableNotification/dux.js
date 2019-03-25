// @flow
import type { SharedUserType } from '../../feed/dux';
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
  user: SharedUserType,
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
  userRequestingPrayer: SharedUserType,
  cancelled: boolean,
};

type ReceiveAcceptedPrayerRequestType = {
  type: 'RECEIVE_ACCEPTED_PRAYER_REQUEST',
  prayerChannel: string,
  hostChannel: string,
};

// Action Creators

const receivePrayerRequestNotification = (
  user: SharedUserType,
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
      user,
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
  userRequestingPrayer: SharedUserType,
  cancelled: boolean,
): PublishAcceptedPrayerRequestType => (
  {
    type: PUBLISH_ACCEPTED_PRAYER_REQUEST,
    prayerChannel,
    hostChannel,
    userRequestingPrayer,
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
