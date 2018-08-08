// @flow
import React from 'react';

import type { UserType } from '../../feed/dux';
import type { ActionableNotificationType } from './dux';

import ChatNotification from '../../../assets/chat-notification.svg';
import styles from './style.css';

type ActionableNotificationPropsType = {
  notification: ActionableNotificationType,
  acceptPrayerRequest: (UserType, id: string) => void,
  publishPrayerNotification: (host: string, guest: string) => void,
  currentUser: UserType,
};

const ActionableNotification = (
  {
    notification,
    acceptPrayerRequest,
    publishPrayerNotification,
    currentUser,
  }: ActionableNotificationPropsType
) => {
  const {
    active,
    user,
    timeStamp,
    id,
  } = notification;

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
          <strong>{user.name} </strong>has requested prayer
        </div>
        <div className={styles.timeStamp}>{timeStamp}</div>
      </div>
      {
        active &&
          <button
            className={styles.acceptButton}
            onClick={
              () => (
                acceptPrayerRequest(user, id),
                publishPrayerNotification(currentUser.name, user.name)
              )
            }
          >
            Accept
          </button>
      }
      <div className={acceptedTextStyle}>Accepted</div>
    </div>
  );
};

export default ActionableNotification;
