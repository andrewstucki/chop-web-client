// @flow
import React from 'react';

import type { ActionableNotificationType } from './dux';

import ChatNotification from '../../../assets/chat-notification.svg';
import styles from './style.css';

type ActionableNotificationPropsType = {
  notification: ActionableNotificationType,
  acceptPrayerRequest: (prayerChannel: string, hostChannel:string, accepted: boolean) => void,
  hostChannel: string,
};

const ActionableNotification = (
  {
    notification,
    acceptPrayerRequest,
    hostChannel,
  }: ActionableNotificationPropsType
) => {
  const {
    active,
    cancelled,
    user,
    timeStamp,
    prayerChannel,
  } = notification;

  const notificationStyle =
    active ? styles.actionableNotification : styles.notification;

  const acceptedTextStyle =
    !active ? styles.showText : styles.hideText;

  const acceptedText = 
    cancelled ? 'Cancelled' : 'Accepted';

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
                acceptPrayerRequest(prayerChannel, hostChannel, false)
              )
            }
          >
            Accept
          </button>
      }
      <div className={acceptedTextStyle}>{acceptedText}</div>
    </div>
  );
};

export default ActionableNotification;
