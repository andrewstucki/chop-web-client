// @flow
/* global React$Node */
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
  notificationObj: NotificationType,
};

const prayerNotificationText = (
  {
    host,
    guest,
    timeStamp,
    isEndingChat,
  }: PrayerNotificationType
) => (
  <div>
    <span
      className={styles.icon}
      dangerouslySetInnerHTML={
        { __html: isEndingChat ? EndChatNotification : ChatNotification }
      }
    />

    <strong>
      {host}
    </strong>
    started a live prayer with
    <strong>
      {guest}
    </strong>

    <div className={styles.timeStamp}>{timeStamp}</div>
  </div>
);

const joinedChatNotificationText = (
  {
    name,
    timeStamp,
    isEndingChat,
  }: JoinedChatNotificationType
) => (
  <div>
    <span
      className={styles.icon}
      dangerouslySetInnerHTML={
        { __html: isEndingChat ? EndChatNotification : ChatNotification }
      }
    />
    <strong>{name}</strong>has joined the chat
    <div className={styles.timeStamp}>{timeStamp}</div>
  </div>
);

const leftChatNotificationText = (
  {
    name,
    timeStamp,
    isEndingChat,
  }: LeftChatNotificationType
) => (
  <div>
    <span
      className={styles.icon}
      dangerouslySetInnerHTML={
        { __html: isEndingChat ? EndChatNotification : ChatNotification }
      }
    />
    <strong>{name}</strong>has left the chat
    <div className={styles.timeStamp}>{timeStamp}</div>
  </div>
);

const getNotificationText = notificationObj => {
  switch (notificationObj.notificationType) {
  case PRAYER:
    return prayerNotificationText(notificationObj);
  case JOINED_CHAT:
    return joinedChatNotificationText(notificationObj);
  case LEFT_CHAT:
    return leftChatNotificationText(notificationObj);
  }
};

const Notification = ({ notificationObj }: NotificationPropsType) => {
  return (
    <div className={styles.notification}>
      {getNotificationText(notificationObj)}
    </div>
  );
};

export default Notification;
