// @flow
import React from 'react';

import type { ActionableNotificationType } from './dux';

import ChatNotification from '../../../assets/chat-notification.svg';
import styles from './style.css';
import type {SharedUserType} from '../../users/dux';

type ActionableNotificationPropsType = {
  notification: ActionableNotificationType,
  acceptPrayerRequest: (prayerChannel: string, hostChannel:string, user: SharedUserType, accepted: boolean) => void,
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
    timestamp,
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
      <div className={styles.actionableWrapper}>
        <span
          className={styles.icon}
          dangerouslySetInnerHTML={
            { __html: ChatNotification }
          }
        />
        <div className={styles.text}>
          <div>
            <strong>{user.name}</strong> has requested prayer
          </div>
          <div className={styles.timestamp}>{timestamp}</div>
        </div>
        {
          active &&
            <button
              className={styles.acceptButton}
              onClick={
                () => (
                  acceptPrayerRequest(prayerChannel, hostChannel, user, false)
                )
              }
            >
              Accept
            </button>
        }
        <div className={acceptedTextStyle}>{acceptedText}</div>
      </div>
    </div>
  );
};

export default React.memo < ActionableNotificationPropsType > (ActionableNotification);
