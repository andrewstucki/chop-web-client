// @flow
import React from 'react';

import type { MessageType } from './dux';
import type { SharedUserType } from '../../feed/dux';
import Avatar from '../../avatar';

import OpenTrayButton from '../../../assets/open-tray-button.svg';
import CloseMessageTray from '../../../assets/close-message-tray-button.svg';
import MessageTray from '../../components/messageTray';

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
  muteUser: (pubnubToken: string) => void,
  publishMuteUserNotification: (host: string, guest: string, channel: string, date: Date) => void,
  directChat: (pubnubToken: string) => void,
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
    toggleCloseTrayButton,
    muteUser,
    directChat,
    mutedNotificationBanner,
  }: MessagePropsType
) => {
  const { messageTrayOpen, closeTrayButtonRendered } = message;
  const messageStyle = 
    messageTrayOpen ? styles.moveMessageLeft : styles.moveMessageRight;

  const renderMessageButtons = () => {
    if (closeTrayButtonRendered) {
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
    <div data-component="messageContainer" className={styles.wrapper}>
    
      <MessageTray
        deleteMessage={() => {
          publishDeleteMessage(message.id);
          deleteMessage(message.id, currentChannel);
        }}
        muteUser={() => {
          muteUser(message.user.pubnubToken);
          mutedNotificationBanner(message.user.name);
          publishMuteUserNotification(currentUser.name, message.user.name, hostChannel, new Date);
          closeMessageTray(message.id);
        }}
        directChat={() => {
          directChat(message.user.pubnubToken);
        }}
      />
      <div
        className={messageStyle}
        onTransitionEnd={() => {
          toggleCloseTrayButton(message.id);
        }}
      >
        <Avatar user={message.user} />
        
        <div className={styles.body}>
          <strong className={styles.name}>{message.user.name}</strong>
          {message.user.role.label &&
            <span className={styles.role}>{message.user.role.label}</span>
          }
          <div data-node="text" className={styles.text}>{message.text}</div>
        </div>
        {renderMessageButtons()}
      </div>

    </div>
  );
};

export default Message;
