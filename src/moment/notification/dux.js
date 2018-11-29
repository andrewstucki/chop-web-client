// @flow
import type { PublishMomentToChannelType, ReceiveMomentType } from '../dux';
import { PUBLISH_MOMENT_TO_CHANNEL, RECEIVE_MOMENT } from '../dux';
import { createUid } from '../../util';

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
  timeStamp: string,
};

type JoinedChatNotificationType = {
  type: 'NOTIFICATION',
  notificationType: 'JOINED_CHAT',
  id: string,
  name: string,
  timeStamp: string,
};

type PrayerNotificationType = {
  type: 'NOTIFICATION',
  notificationType: 'PRAYER',
  id: string,
  host: string,
  guest: string,
  timeStamp: string,
};

type MuteUserNotificationType = {
  type: 'NOTIFICATION',
  notificationType: 'MUTE',
  id: string,
  host: string,
  guest: string,
  timeStamp: string,
}

// Action Creators

const formatAMPM = (date: Date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + minutes + ampm;
  return strTime;
};

const receivePrayerNotification = (
  host: string,
  guest: string,
  channel: string,
  date: number,
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
      timeStamp: formatAMPM(new Date(date * 1000)),
    },
  }
);

const publishLeftChannelNotification = (
  name: string,
  pubnubToken: string,
  channel: string,
  date: Date,
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
      timeStamp: formatAMPM(date),
    },
  }
);

const receiveLeftChannelNotification = (
  name: string,
  channel: string,
  date: string,
): ReceiveMomentType => (
  {
    type: RECEIVE_MOMENT,
    channel,
    moment: {
      type: NOTIFICATION,
      notificationType: LEFT_CHANNEL,
      id: createUid(),
      name,
      timeStamp: date,
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
      timeStamp: formatAMPM(new Date),
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
      timeStamp: formatAMPM(new Date),
    },
  }
);

const publishMuteUserNotification = (
  host: string,
  guest: string,
  channel: string,
  date: Date,
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
      timeStamp: formatAMPM(date),
    },
  }
);

const receiveMuteUserNotification = (
  host: string,
  guest: string,
  channel: string,
  date: string,
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
      timeStamp: date,
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
  formatAMPM,
};

export {
  PRAYER,
  MUTE,
  JOINED_CHAT,
  LEFT_CHANNEL,
  NOTIFICATION,
};
