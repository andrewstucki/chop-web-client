// @flow
import type { PublishMomentToChannelType, ReceiveMomentType } from '../dux';
import { PUBLISH_MOMENT_TO_CHANNEL, RECEIVE_MOMENT } from '../dux';
import {createUid, getMessageTimestamp} from '../../util';
import type { SharedSubscriberType } from '../../subscriber/dux';

// Action Types

const NOTIFICATION = 'NOTIFICATION';
const LEFT_CHANNEL = 'LEFT_CHANNEL';
const JOINED_CHAT = 'JOINED_CHAT';
const PRAYER = 'PRAYER';
const PRAYER_REQUEST = 'PRAYER_REQUEST';
const MUTE = 'MUTE';

// Flow Type Definitions

type NotificationType =
  | PrayerNotificationType
  | PrayerRequestNotificationType
  | JoinedChatNotificationType
  | LeftChannelNotificationType
  | MuteSubscriberNotificationType;

type LeftChannelNotificationType = {
  type: 'NOTIFICATION',
  notificationType: 'LEFT_CHANNEL',
  id: string,
  nickname: string,
  timestamp: string,
};

type JoinedChatNotificationType = {
  type: 'NOTIFICATION',
  notificationType: 'JOINED_CHAT',
  id: string,
  nickname: string,
  timestamp: string,
};

type PrayerNotificationType = {
  type: 'NOTIFICATION',
  notificationType: 'PRAYER',
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
  type: 'NOTIFICATION',
  notificationType: 'MUTE',
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
    },
  }
);

const receiveLeftChannelNotification = (
  nickname: string,
  channel: string,
  timestamp: string,
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
    },
  }
);

const publishJoinedChatNotification = (
  name: string,
  channel: string,
): PublishMomentToChannelType => (
  {
    type: PUBLISH_MOMENT_TO_CHANNEL,
    channel,
    moment: {
      type: NOTIFICATION,
      notificationType: JOINED_CHAT,
      id: createUid(),
      name,
      timestamp: getMessageTimestamp(),
    },
  }
);

const receiveJoinedChatNotification = (
  name: string,
  channel: string,
): ReceiveMomentType => (
  {
    type: RECEIVE_MOMENT,
    channel,
    moment: {
      type: NOTIFICATION,
      notificationType: JOINED_CHAT,
      id: createUid(),
      name,
      timestamp: getMessageTimestamp(),
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
  JoinedChatNotificationType,
  MuteSubscriberNotificationType,
  PrayerNotificationType,
  PrayerRequestNotificationType,
};

export {
  publishJoinedChatNotification,
  receiveJoinedChatNotification,
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
  JOINED_CHAT,
  LEFT_CHANNEL,
  NOTIFICATION,
};
