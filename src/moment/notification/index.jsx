// @flow
import React from 'react';

import {
  PRAYER,
  JOINED_CHAT,
  LEFT_CHAT,
} from './dux';

import type {
  PrayerNotificationType,
  JoinedChatNotificationType,
  LeftChatNotificationType,
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
    <div>
      <div>
        <strong>{host} </strong>started a live prayer with<strong> {guest}</strong>
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
    <div>
      <div>
        <strong>{name} </strong>has joined the chat
      </div>
      <div className={styles.timeStamp}>{timeStamp}</div>
    </div>
  </div>
);

const leftChatNotificationText = (
  {
    name,
    timeStamp,
  }: LeftChatNotificationType
) => (
  <div className={styles.notification}>
    <span
      className={styles.icon}
      dangerouslySetInnerHTML={
        { __html: EndChatNotification }
      }
    />
    <div>
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
  case JOINED_CHAT:
    return joinedChatNotificationText(notification);
  case LEFT_CHAT:
    return leftChatNotificationText(notification);
  }
};

const Notification = ({ notification }: NotificationPropsType) => (
  getNotificationText(notification)
);

export default Notification;
