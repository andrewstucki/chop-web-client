// @flow
import type { SharedUserType } from '../../feed/dux';
import type { ReceiveMomentType } from '../dux';
import { RECEIVE_MOMENT } from '../dux';
import { formatAMPM } from '../notification/dux';
import { createUid } from '../../util';

// Action Types

const ACTIONABLE_NOTIFICATION = 'ACTIONABLE_NOTIFICATION';
const PRAYER_REQUEST = 'PRAYER_REQUEST';
const PUBLISH_ACCEPTED_PRAYER_REQUEST = 'PUBLISH_ACCEPTED_PRAYER_REQUEST';
const RECEIVE_ACCEPTED_PRAYER_REQUEST = 'RECEIVE_ACCEPTED_PRAYER_REQUEST';

// Flow Type Definitions

type PrayerRequestNotificationType = {
  type: 'ACTIONABLE_NOTIFICATION',
  notificationType: 'PRAYER_REQUEST',
  id: string,
  user: SharedUserType,
  timeStamp: string,
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
      timeStamp: formatAMPM(new Date),
      prayerChannel,
    },
  }
);

const publishAcceptedPrayerRequest = (
  prayerChannel: string,
  hostChannel: string,
  cancelled: boolean,
): PublishAcceptedPrayerRequestType => (
  {
    type: PUBLISH_ACCEPTED_PRAYER_REQUEST,
    prayerChannel,
    hostChannel,
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
  RECEIVE_ACCEPTED_PRAYER_REQUEST,
};
