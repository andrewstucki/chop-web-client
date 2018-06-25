// @flow
/* global React$Node */
import {
  PUBLISH_MOMENT_TO_CHANNEL,
} from '../dux';

// Function we got from stackoveflow

function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ampm;
  return strTime;
}

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
  isEndingChat: boolean,
};

type JoinedChatNotificationType = {
  type: 'NOTIFICATION',
  notificationType: 'JOINED_CHAT',
  name: string,
  timeStamp: string,
  isEndingChat: boolean,
};

type PrayerNotificationType = {
  type: 'NOTIFICATION',
  notificationType: 'PRAYER',
  host: string,
  guest: string,
  timeStamp: string,
  isEndingChat: boolean,
};

// Action Creators

const publishPrayerNotification = (host: string, guest: string) => (
  {
    type: PUBLISH_MOMENT_TO_CHANNEL,
    channel: 'host',
    moment: {
      type: NOTIFICATION,
      subType: PRAYER,
      host,
      guest,
      timeStamp: formatAMPM(new Date()),
      isEndingChat: false,
    }
  }
);

const publishLeftChatNotification = (name: string, channel: string) => (
  {
    type: PUBLISH_MOMENT_TO_CHANNEL,
    channel,
    moment: {
      type: NOTIFICATION,
      subType: LEFT_CHAT,
      name,
      timeStamp: formatAMPM(new Date()),
      isEndingChat: true,
    }
  }
);

const publishJoinedChatNotification = (name: string, channel: string) => (
  {
    type: PUBLISH_MOMENT_TO_CHANNEL,
    channel,
    moment: {
      type: NOTIFICATION,
      subType: JOINED_CHAT,
      name,
      timeStamp: formatAMPM(new Date()),
      isEndingChat: false,
    }
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
