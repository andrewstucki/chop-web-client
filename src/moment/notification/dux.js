// @flow
import type { PublishMomentToChannelType, ReceiveMomentType } from '../dux';
import { PUBLISH_MOMENT_TO_CHANNEL, RECEIVE_MOMENT } from '../dux';
import {createUid, getMessageTimestamp} from '../../util';

// Action Types

const NOTIFICATION = 'NOTIFICATION';
const LEFT_CHANNEL = 'LEFT_CHANNEL';
const JOINED_CHAT = 'JOINED_CHAT';
const PRAYER = 'PRAYER';
const MUTE = 'MUTE';

// Flow Type Definitions

type NotificationType =
  | PrayerNotificationType
  | JoinedChatNotificationType
  | LeftChannelNotificationType
  | MuteUserNotificationType;

type LeftChannelNotificationType = {
  type: 'NOTIFICATION',
  notificationType: 'LEFT_CHANNEL',
  id: string,
  name: string,
  timestamp: string,
};

type JoinedChatNotificationType = {
  type: 'NOTIFICATION',
  notificationType: 'JOINED_CHAT',
  id: string,
  name: string,
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

type MuteUserNotificationType = {
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

const publishLeftChannelNotification = (
  name: string,
  pubnubToken: string,
  channel: string,
  timestamp: string,
): PublishMomentToChannelType => (
  {
    type: PUBLISH_MOMENT_TO_CHANNEL,
    channel,
    moment: {
      type: NOTIFICATION,
      notificationType: LEFT_CHANNEL,
      pubnubToken,
      id: createUid(),
      name,
      timestamp,
    },
  }
);

const receiveLeftChannelNotification = (
  name: string,
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
      name,
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

const publishMuteUserNotification = (
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

const receiveMuteUserNotification = (
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
  MuteUserNotificationType,
  PrayerNotificationType,
};

export {
  publishJoinedChatNotification,
  receiveJoinedChatNotification,
  publishMuteUserNotification,
  receiveMuteUserNotification,
  publishLeftChannelNotification,
  receiveLeftChannelNotification,
  receivePrayerNotification,
};

export {
  PRAYER,
  MUTE,
  JOINED_CHAT,
  LEFT_CHANNEL,
  NOTIFICATION,
};
