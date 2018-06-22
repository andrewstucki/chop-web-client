// @flow
/* global React$Node */
import React from 'react';

import ChatNotification from '../../../assets/chat-notification.svg';
import EndChatNotification from '../../../assets/end-chat-notification.svg';
import parseUserNames from '../../util';
import styles from './style.css';

type NotificationPropsType = {
  text: string,
  timeStamp: string,
};

const notificationImage = () => {
  //TODO set up logic for determining when to use the right icon
  const endChat = false;
  if (endChat) {
    return EndChatNotification;
  }
  return ChatNotification;
};


const Notification = ({ text, timeStamp }: NotificationPropsType) => (
  <div className={styles.notification}>
    <span
      className={styles.icon}
      dangerouslySetInnerHTML={{ __html: notificationImage() }}
    />
    <div>
      {parseUserNames(text)}
      <div className={styles.timeStamp}>{timeStamp}</div>
    </div>
  </div>
);

export default Notification;
