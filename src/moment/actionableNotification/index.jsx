// @flow
import React from 'react';

import { PRAYER_REQUEST } from './dux';

import type {
  ActionableNotificationType,
  PrayerRequestNotificationType,
} from './dux';
import ChatNotification from '../../../assets/chat-notification.svg';
import styles from './style.css';

type ActionableNotificationPropsType = {
  notification: ActionableNotificationType,
};

const prayerRequestNotificationText = (
  {
    user,
    timeStamp,
    active,
    action,
  }: PrayerRequestNotificationType
) => {
  const notificationStyle =
    active ? styles.actionableNotification : styles.notification;

  const acceptedTextStyle =
    !active ? styles.showText : styles.hideText;

  return (
    <div className={notificationStyle}>
      <span
        className={styles.icon}
        dangerouslySetInnerHTML={
          { __html: ChatNotification }
        }
      />
      <div className={styles.text}>
        <div>
          <strong>{user.nickname} </strong>has requested prayer
        </div>
        <div className={styles.timeStamp}>{timeStamp}</div>
      </div>
      {
        active &&
          <button
            className={styles.acceptButton}
            onClick={
              () => (action())
            }
          >
            Accept
          </button>
      }
      <div className={acceptedTextStyle}>Accepted</div>
    </div>
  );
};

const getNotificationText = notification => {
  switch (notification.notificationType) {
  case PRAYER_REQUEST:
    return prayerRequestNotificationText(notification);
  }
};

const ActionableNotification = (
  { notification }: ActionableNotificationPropsType
) => (
  getNotificationText(notification)
);

export default ActionableNotification;
