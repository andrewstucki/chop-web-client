// @flow
import {
  PUBLISH_MOMENT_TO_CHANNEL,
} from '../dux';

// Function we got from stackoveflow

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

// Type Definitions

const NOTIFICATION = 'NOTIFICATION';
const LEFT_CHAT = 'LEFT_CHAT';
const JOINED_CHAT = 'JOINED_CHAT';
const PRAYER = 'PRAYER';

type NotificationType =
  | PrayerNotificationType
  | JoinedChatNotificationType
  | LeftChatNotificationType;

type LeftChatNotificationType = {
  type: 'NOTIFICATION',
  notificationType: 'LEFT_CHAT',
  name: string,
  timeStamp: string,
};

type JoinedChatNotificationType = {
  type: 'NOTIFICATION',
  notificationType: 'JOINED_CHAT',
  name: string,
  timeStamp: string,
};

type PrayerNotificationType = {
  type: 'NOTIFICATION',
  notificationType: 'PRAYER',
  host: string,
  guest: string,
  timeStamp: string,
};

// Action Creators

const publishPrayerNotification = (host: string, guest: string) => (
  {
    type: PUBLISH_MOMENT_TO_CHANNEL,
    channel: 'host',
    moment: {
      type: NOTIFICATION,
      notificationType: PRAYER,
      host,
      guest,
      timeStamp: formatAMPM(new Date),
    },
  }
);

const publishLeftChatNotification = (name: string, channel: string) => (
  {
    type: PUBLISH_MOMENT_TO_CHANNEL,
    channel,
    moment: {
      type: NOTIFICATION,
      notificationType: LEFT_CHAT,
      name,
      timeStamp: formatAMPM(new Date()),
    },
  }
);

const publishJoinedChatNotification = (name: string, channel: string) => (
  {
    type: PUBLISH_MOMENT_TO_CHANNEL,
    channel,
    moment: {
      type: NOTIFICATION,
      notificationType: JOINED_CHAT,
      name,
      timeStamp: formatAMPM(new Date()),
    },
  }
);

// Exports

export type {
  NotificationType,
  LeftChatNotificationType,
  JoinedChatNotificationType,
  PrayerNotificationType,
};

export {
  publishJoinedChatNotification,
  publishLeftChatNotification,
  publishPrayerNotification,
  formatAMPM,
};

export {
  PRAYER,
  JOINED_CHAT,
  LEFT_CHAT,
};
