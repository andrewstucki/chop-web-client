// @flow
import React from 'react';
import styles from './style.css';
import type { MessageType } from '../../chat/dux';
import { getFirstInitial, getAvatarColor } from '../../util';

type MessagePropsType = {
  message: MessageType,
  appendingMessage: boolean,
};

const Message = ({ message, appendingMessage }: MessagePropsType) => {
  const style = appendingMessage ? styles.appending : styles.notAppending;
  return (
    <div className={style}>
      <div
        className={styles.icon} 
        style={{backgroundColor: getAvatarColor(message.user.nickname)}}
      >
        {getFirstInitial(message.user.nickname)}
      </div>
      <div className={styles.body}>
        <strong className={styles.name}>{message.user.nickname}</strong>
        <span className={styles.role}>Host</span>
        <div className={styles.message}>{message.message}</div>
      </div>
    </div>
  );
};

export default Message;
