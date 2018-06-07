// @flow
/* global SyntheticMouseEvent */
import React from 'react';

import type { MessageType } from '../../chat/dux';
import { getFirstInitial, getAvatarColor } from '../../util';
import OpenTrayButton from '../../../assets/open-tray-button.svg';

import styles from './style.css';

type MessagePropsType = {
  message: MessageType,
  appendingMessage: boolean,
  trayButtonOnClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
};

const Message = ({ message, appendingMessage, onClick, trayButtonOnClick }: MessagePropsType) => {
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
      <button
        className={styles.openTrayButton}
        dangerouslySetInnerHTML={{ __html: OpenTrayButton }}
        onClick={trayButtonOnClick}
      />
    </div>
  );
};

export default Message;
