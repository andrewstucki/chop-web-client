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
  }: PrayerRequestNotificationType
) => (
  <div className={styles.notification}>
    <span
      className={styles.icon}
      dangerouslySetInnerHTML={
        { __html: ChatNotification }
      }
    />
    <div>
      <div className={styles.text}>
        <strong>{name} </strong>has requested prayer
      </div>
      <div className={styles.timeStamp}>{timeStamp}</div>
    </div>
    <button
      className={styles.acceptButton}
      onClick={() => {console.log('Howdy')}}
    >
      Accept
    </button>
  </div>
);

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
