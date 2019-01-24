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
import MuteUserNotification from '../../../assets/mute-user-notification.svg';
import styles from './style.css';

type NotificationPropsType = {
  notification: NotificationType,
};

const prayerNotificationText = (
  {
    host,
    guest,
    timestamp,
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
        <strong>{host} </strong>started a live prayer with<strong> {guest}</strong>
      </div>
      <div className={styles.timestamp}>{timestamp}</div>
    </div>
  </div>
);

const MuteUserNotificationText = (
  {
    host,
    guest,
    timestamp,
  }: MuteUserNotificationType
) => (
  <div className={styles.notification}>
    <span
      className={styles.icon}
      dangerouslySetInnerHTML={
        {__html: MuteUserNotification}
      }
    />
    <div className={styles.text}>
      <div>
        {
          host ? (
            <span>
              <strong>{host} </strong>muted<strong> {guest}</strong>
            </span>
          ) : (
            <span>
              <strong>{guest} </strong>was muted
            </span>
          )
        }
      </div>
      <div className={styles.timestamp}>{timestamp}</div>
    </div>
  </div>
);

const joinedChatNotificationText = (
  {
    name,
    timestamp,
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
        { name === 'You' ?
          <span>{name} have joined the chat</span> : <span><strong>{name}</strong> has joined the chat</span>
        }
      </div>
      <div className={styles.timestamp}>{timestamp}</div>
    </div>
  </div>
);

const leftChannelNotificationText = (
  {
    name,
    timestamp,
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
      <div className={styles.timestamp}>{timestamp}</div>
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
  default:
    return null;
  }
};

const Notification = ({ notification }: NotificationPropsType) => (
  getNotificationText(notification)
);

export default Notification;
