// @flow
import React from 'react';

import type { MessageType } from './dux';
import { getFirstInitial, getAvatarColor } from '../util';
import OpenTrayButton from '../../assets/open-tray-button.svg';
import CloseMessageTray from '../../assets/close-message-tray-button.svg';
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
  const { messageTrayOpen } = message;
  const messageContainerStyle = appendingMessage ? styles.appending : styles.notAppending;
  const messageStyle = messageTrayOpen ? styles.moveMessageLeft : styles.moveMessageRight;

  const renderTrayButtons = () => {
    if (messageTrayOpen) {
      return (
        <button
          className={styles.closeTrayButton}
          dangerouslySetInnerHTML={{ __html: CloseMessageTray }}
          onClick={() => {
            closeMessageTray(message.id);
          }}
        />
      );
    }
    return (
      <button
        className={styles.openTrayButton}
        dangerouslySetInnerHTML={{ __html: OpenTrayButton }}
        onClick={() => {
          openMessageTray(message.id);
        }}
      />
    );
  };

  return (
    <div data-component="messageContainer" className={messageContainerStyle}>
    
      <MessageTray
        deleteMessage={() => {
          deleteMessage(message.id);
        }}
      />

      <div className={messageStyle}>
        <div
          className={styles.icon} 
          style={{backgroundColor: getAvatarColor(message.user.nickname)}}
        >
          {getFirstInitial(message.user.nickname)}
        </div>
        <div className={styles.body}>
          <strong className={styles.name}>{message.user.nickname}</strong>
          <span className={styles.role}>Host</span>
          <div data-node="text" className={styles.text}>{message.text}</div>
        </div>
        {renderTrayButtons()}
      </div>

    </div>
  );
};

export default Message;
