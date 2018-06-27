// @flow
import React from 'react';

import { PRAYER_REQUEST } from './dux';

import type {
  ActionableNotificationType,
  PrayerRequestNotificationType,
} from './dux';

type ActionableNotificationPropsType = {
  notification: ActionableNotificationType,
};

import ChatNotification from '../../../assets/chat-notification.svg';
import styles from './style.css';

const prayerRequestNotificationText = (
  {
    name,
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
          <strong>{name} </strong>has requested prayer
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

const ActionableNotification = ({ notification }: ActionableNotificationPropsType) => (
  <div>
    {getNotificationText(notification)}
  </div>
);

export default ActionableNotification;
