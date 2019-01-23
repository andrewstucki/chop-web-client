// @flow
import React from 'react';

import type { MessageType } from './dux';
import type { SharedUserType } from '../../feed/dux';
import Avatar from '../../avatar';

import OpenTrayButton from '../../../assets/open-tray-button.svg';
import MessageTray from '../../components/messageTray';
import linkifyHtml from 'linkifyjs/html';
import { sanitizeString } from '../../util';

import styles from './style.css';

type MessagePropsType = {
  message: MessageType,
  currentChannel: string,
  hostChannel: string,
  currentUser: SharedUserType,
  openMessageTray: (id: string) => void,
  closeMessageTray: (id: string) => void,
  deleteMessage: (id: string, channel: string) => void,
  publishDeleteMessage: (id: string) => void,
  toggleCloseTrayButton: (id: string) => void,
  muteUser: (channel: string, nickname: string) => void,
  publishMuteUserNotification: (host: string, guest: string, channel: string) => void,
  directChat: (pubnubToken: string, nickname: string) => void,
  mutedNotificationBanner: (guestName: string) => void,
};

const Message = (
  {
    message,
    currentChannel,
    openMessageTray,
    hostChannel,
    closeMessageTray,
    publishMuteUserNotification,
    currentUser,
    publishDeleteMessage,
    deleteMessage,
    muteUser,
    directChat,
    mutedNotificationBanner,
  }: MessagePropsType
) => {
  const { messageTrayOpen, text } = message;
  const messageStyle = 
    messageTrayOpen ? styles.messageTrayOpen : styles.messageTrayClosed;

  const renderText = linkifyHtml(text, { target: '_blank' });

  return (
    <div data-component='messageContainer' className={styles.wrapper + ' ' + messageStyle}>

      <div
        className={styles.message}
        onClick={messageTrayOpen ? () => {
          closeMessageTray(message.id);
        } : undefined}
        onTouchStart={messageTrayOpen ? () => {
          closeMessageTray(message.id);
        } : undefined}
      >
        <Avatar user={message.sender} />

        <div className={styles.body}>
          <strong className={styles.name}>{message.sender.name}</strong>
          {message.sender.role.label &&
            <span className={styles.role}>{message.sender.role.label}</span>
          }
          <div key={message.id} data-node='text' className={styles.text} dangerouslySetInnerHTML={{ __html: sanitizeString(renderText) }} />
        </div>
        <button
          className={styles.openTrayButton}
          dangerouslySetInnerHTML={{ __html: OpenTrayButton }}
          onClick={() => {
            openMessageTray(message.id);
          }}
          onTouchStart={() => {
            openMessageTray(message.id);
          }}
        />
      </div>
      
      <MessageTray
        closeTray={() => {
          closeMessageTray(message.id);
        }}
        deleteMessage={() => {
          publishDeleteMessage(message.id);
          deleteMessage(message.id, currentChannel);
        }}
        muteUser={() => {
          muteUser(currentChannel, message.sender.name);
          mutedNotificationBanner(message.sender.name);
          publishMuteUserNotification(currentUser.name, message.sender.name, hostChannel);
          closeMessageTray(message.id);
        }}
        directChat={() => {
          directChat(message.sender.pubnubToken, message.sender.name);
        }}
      />

    </div>
  );
};

export default Message;
