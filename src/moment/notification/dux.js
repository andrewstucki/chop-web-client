// @flow
import type { PublishMomentToChannelType, ReceiveMomentType } from '../dux';
import { PUBLISH_MOMENT_TO_CHANNEL, RECEIVE_MOMENT } from '../dux';
import {createUid, getMessageTimestamp} from '../../util';
import type { SharedSubscriberType } from '../../subscriber/dux';

// Action Types

const NOTIFICATION = 'NOTIFICATION';
const LEFT_CHANNEL = 'LEFT_CHANNEL';
const JOINED_CHANNEL = 'JOINED_CHANNEL';
const PRAYER = 'PRAYER';
const PRAYER_REQUEST = 'PRAYER_REQUEST';
const MUTE = 'MUTE';

// Flow Type Definitions

type NotificationType =
  | PrayerNotificationType
  | PrayerRequestNotificationType
  | JoinedChannelNotificationType
  | LeftChannelNotificationType
  | MuteSubscriberNotificationType;

type LeftChannelNotificationType = {
  type: typeof NOTIFICATION,
  notificationType: typeof LEFT_CHANNEL,
  id: string,
  nickname: string,
  timestamp: string,
  label: string,
};

type JoinedChannelNotificationType = {
  type: typeof NOTIFICATION,
  notificationType: typeof JOINED_CHANNEL,
  id: string,
  nickname: string,
  timestamp: string,
  label: string,
};

type PrayerNotificationType = {
  type: typeof NOTIFICATION,
  notificationType: typeof PRAYER,
  id: string,
  host: string,
  guest: string,
  timestamp: string,
};

type PrayerRequestNotificationType = {
  type: typeof NOTIFICATION,
  notificationType: typeof PRAYER_REQUEST,
  id: string,
  guest: string,
  timestamp: string,
};

type MuteSubscriberNotificationType = {
  type: typeof NOTIFICATION,
  notificationType: typeof MUTE,
  id: string,
  host: string,
  guest: string,
  timestamp: string,
}

// Action Creators

const receivePrayerNotification = (
  host: string,
  guest: string,
  channel: string,
  timestamp: string,
): ReceiveMomentType => (
  {
    type: RECEIVE_MOMENT,
    channel,
    moment: {
      type: NOTIFICATION,
      notificationType: PRAYER,
      id: createUid(),
      host,
      guest,
      timestamp,
    },
  }
);

const receivePrayerRequestNotification = (
  guest: SharedSubscriberType,
  channel: string,
): ReceiveMomentType => (
  {
    type: RECEIVE_MOMENT,
    channel,
    moment: {
      type: NOTIFICATION,
      notificationType: PRAYER_REQUEST,
      id: createUid(),
      guest: guest.nickname,
      timestamp: getMessageTimestamp(),
    },
  }
);

const publishLeftChannelNotification = (
  nickname: string,
  id: string,
  channel: string,
  timestamp: string,
  label: string,
): PublishMomentToChannelType => (
  {
    type: PUBLISH_MOMENT_TO_CHANNEL,
    channel,
    moment: {
      type: NOTIFICATION,
      notificationType: LEFT_CHANNEL,
      id,
      nickname,
      timestamp,
      label,
    },
  }
);

const receiveLeftChannelNotification = (
  nickname: string,
  channel: string,
  timestamp: string,
  label: string,
): ReceiveMomentType => (
  {
    type: RECEIVE_MOMENT,
    channel,
    moment: {
      type: NOTIFICATION,
      notificationType: LEFT_CHANNEL,
      id: createUid(),
      nickname,
      timestamp,
      label,
    },
  }
);

const publishJoinedChannelNotification = (
  nickname: string,
  id: string,
  channel: string,
  timestamp: string,
  label: string,
): PublishMomentToChannelType => (
  {
    type: PUBLISH_MOMENT_TO_CHANNEL,
    channel,
    moment: {
      type: NOTIFICATION,
      notificationType: JOINED_CHANNEL,
      id,
      nickname,
      timestamp: getMessageTimestamp(),
      label,
    },
  }
);

const receiveJoinedChannelNotification = (
  nickname: string,
  channel: string,
  timestamp: string,
  label: string,
): ReceiveMomentType => (
  {
    type: RECEIVE_MOMENT,
    channel,
    moment: {
      type: NOTIFICATION,
      notificationType: JOINED_CHANNEL,
      id: createUid(),
      nickname,
      timestamp: timestamp,
      label,
    },
  }
);

const publishMuteSubscriberNotification = (
  host: string,
  guest: string,
  channel: string,
  timestamp: string,
): PublishMomentToChannelType => (
  {
    type: PUBLISH_MOMENT_TO_CHANNEL,
    channel,
    moment: {
      type: NOTIFICATION,
      notificationType: MUTE,
      id: createUid(),
      host,
      guest,
      timestamp,
    },
  }
);

const receiveMuteSubscriberNotification = (
  host: string,
  guest: string,
  channel: string,
  timestamp: string,
): ReceiveMomentType => (
  {
    type: RECEIVE_MOMENT,
    channel,
    moment: {
      type: NOTIFICATION,
      notificationType: MUTE,
      id: createUid(),
      host,
      guest,
      timestamp,
    },
  }
);

// Exports

export type {
  NotificationType,
  LeftChannelNotificationType,
  JoinedChannelNotificationType,
  MuteSubscriberNotificationType,
  PrayerNotificationType,
  PrayerRequestNotificationType,
};

export {
  publishJoinedChannelNotification,
  receiveJoinedChannelNotification,
  publishMuteSubscriberNotification,
  receiveMuteSubscriberNotification,
  publishLeftChannelNotification,
  receiveLeftChannelNotification,
  receivePrayerNotification,
  receivePrayerRequestNotification,
};

export {
  PRAYER,
  PRAYER_REQUEST,
  MUTE,
  JOINED_CHANNEL,
  LEFT_CHANNEL,
  NOTIFICATION,
};
