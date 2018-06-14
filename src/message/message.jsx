// @flow
import React from 'react';
import ReactTouchEvents from 'react-touch-events';

import type { MessageType } from './dux';
import { getFirstInitial, getAvatarColor } from '../util';
import OpenTrayButton from '../../assets/open-tray-button.svg';
import MessageTray from '../components/messageTray';

import styles from './style.css';

type MessagePropsType = {
  message: MessageType,
  appendingMessage: boolean,
  openButtonOnClick: (id: string) => void,
  closeButtonOnClick: (id: string) => void,
  deleteButtonOnClick: (id: string) => void,
};

const Message = (
  {
    message,
    appendingMessage,
    openButtonOnClick,
    closeButtonOnClick,
    deleteButtonOnClick,
  }: MessagePropsType) => {
  const messageStyle = appendingMessage ? styles.appending : styles.notAppending;

  return (
    <ReactTouchEvents
      onSwipe={direction => {
        if (direction === 'left') return openButtonOnClick(message.id);
      }}
    >
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
          <div className={styles.message}>{message.text}</div>
        </div>
        <button
          className={styles.openTrayButton}
          dangerouslySetInnerHTML={{ __html: OpenTrayButton }}
          onClick={() => {
            openButtonOnClick(message.id);
          }}
        />
        <MessageTray
          messageId={message.id}
          messageTrayOpen={message.messageTrayOpen}
          closeButtonOnClick={closeButtonOnClick}
          deleteButtonOnClick={() => {
            deleteButtonOnClick(message.id);
          }}
        />
      </div>
    </ReactTouchEvents>
  );
};

export default Message;
