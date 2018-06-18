// @flow
import React from 'react';

import type { MessageType } from './dux';
import { getFirstInitial, getAvatarColor } from '../util';
import OpenTrayButton from '../../assets/open-tray-button.svg';
import MessageTray from '../components/messageTray';

import styles from './style.css';

type MessagePropsType = {
  message: MessageType,
  appendingMessage: boolean,
  openMessageTray: (id: string) => void,
  closeMessageTray: (id: string) => void,
  deleteMessage: (id: string) => void,
};

const Message = (
  {
    message,
    appendingMessage,
    openMessageTray,
    closeMessageTray,
    deleteMessage,
  }: MessagePropsType) => {
  const messageStyle = appendingMessage ? styles.appending : styles.notAppending;

  return (
    <div data-component="message" className={messageStyle}>
      <div
        className={styles.icon} 
        style={{backgroundColor: getAvatarColor(message.user.nickname)}}
      >
        {getFirstInitial(message.user.nickname)}
      </div>
      <div className={styles.body}>
        <strong className={styles.name}>{message.user.nickname}</strong>
        <span className={styles.role}>Host</span>
        <div data-node="text" className={styles.message}>{message.text}</div>
      </div>
      <button
        className={styles.openTrayButton}
        dangerouslySetInnerHTML={{ __html: OpenTrayButton }}
        onClick={() => {
          openMessageTray(message.id);
        }}
      />
      <MessageTray
        messageId={message.id}
        messageTrayOpen={message.messageTrayOpen}
        closeMessageTray={closeMessageTray}
        deleteMessage={() => {
          deleteMessage(message.id);
        }}
      />
    </div>
  );
};

export default Message;
