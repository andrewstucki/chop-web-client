// @flow
import React from 'react';

import {
  PRAYER,
  MUTE,
  JOINED_CHAT,
  LEFT_CHANNEL,
} from './dux';

import type {
  PrayerNotificationType,
  MuteUserNotificationType,
  JoinedChatNotificationType,
  LeftChannelNotificationType,
  NotificationType,
} from './dux';

import ChatNotification from '../../../assets/chat-notification.svg';
import EndChatNotification from '../../../assets/end-chat-notification.svg';
import styles from './style.css';

type NotificationPropsType = {
  notification: NotificationType,
};

const prayerNotificationText = (
  {
    host,
    guest,
    timeStamp,
  }: PrayerNotificationType
) => (
  <div className={styles.notification}>
    <span
      className={styles.icon}
      dangerouslySetInnerHTML={
        { __html: ChatNotification }
      }
    />
    <div className={styles.text}>
      <div>
        <strong>{host.name} </strong>started a live prayer with<strong> {guest.name}</strong>
      </div>
      <div className={styles.timeStamp}>{timeStamp}</div>
    </div>
  </div>
);

const MuteUserNotificationText = (
  {
    host,
    guest,
    timeStamp,
  }: MuteUserNotificationType
) => (
  <div className={styles.notification}>
    <span
      className={styles.icon}
      dangerouslySetInnerHTML={
        { __html: ChatNotification }
      }
    />
    <div className={styles.text}>
      <div>
        <strong>{host} </strong>muted<strong> {guest}</strong>
      </div>
      <div className={styles.timeStamp}>{timeStamp}</div>
    </div>
  </div>
);

const joinedChatNotificationText = (
  {
    name,
    timeStamp,
  }: JoinedChatNotificationType
) => (
  <div className={styles.notification}>
    <span
      className={styles.icon}
      dangerouslySetInnerHTML={
        { __html: ChatNotification }
      }
    />
    <div className={styles.text}>
      <div>
        <strong>{name} </strong>has joined the chat
      </div>
      <div className={styles.timeStamp}>{timeStamp}</div>
    </div>
  </div>
);

const leftChannelNotificationText = (
  {
    name,
    timeStamp,
  }: LeftChannelNotificationType
) => (
  <div className={styles.notification}>
    <span
      className={styles.icon}
      dangerouslySetInnerHTML={
        { __html: EndChatNotification }
      }
    />
    <div className={styles.text}>
      <div>
        <strong>{name} </strong>has left the chat
      </div>
      <div className={styles.timeStamp}>{timeStamp}</div>
    </div>
  </div>
);

const getNotificationText = notification => {
  switch (notification.notificationType) {
  case PRAYER:
    return prayerNotificationText(notification);
  case MUTE:
    return MuteUserNotificationText(notification);
  case JOINED_CHAT:
    return joinedChatNotificationText(notification);
  case LEFT_CHANNEL:
    return leftChannelNotificationText(notification);
  }
};

const Notification = ({ notification }: NotificationPropsType) => (
  getNotificationText(notification)
);

export default Notification;
