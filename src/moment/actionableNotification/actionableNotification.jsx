// @flow
import React from 'react';

import type { SharedUserType } from '../../feed/dux';
import type { ActionableNotificationType } from './dux';

import ChatNotification from '../../../assets/chat-notification.svg';
import styles from './style.css';

type ActionableNotificationPropsType = {
  notification: ActionableNotificationType,
  acceptPrayerRequest: (SharedUserType, id: string, channel:string) => void,
  publishPrayerNotification: (host:SharedUserType, guest: SharedUserType, channel:string) => void,
  currentUser: SharedUserType,
  hostChannel: string,
};

const ActionableNotification = (
  {
    notification,
    acceptPrayerRequest,
    publishPrayerNotification,
    currentUser,
    hostChannel,
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
                acceptPrayerRequest(user, id, hostChannel),
                publishPrayerNotification(currentUser, user, hostChannel)
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
