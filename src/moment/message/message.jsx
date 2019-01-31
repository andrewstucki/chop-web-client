// @flow
import React from 'react';

import type { MessageType } from './dux';
import type { SharedUserType } from '../../feed/dux';
import Avatar from '../../avatar';

import OpenTrayButton from '../../../assets/open-tray-button.svg';
import MessageTray from '../../components/messageTray';
import { Actionable } from '../../components/Actionable';
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
    message: {
      sender,
      messageTrayOpen,
      text,
      id:messageId,
    },
    currentChannel,
    hostChannel,
    currentUser: {
      name:currentUserName,
    },
    ...otherProps
  }: MessagePropsType
) => {
  const { name: senderName, pubnubToken: senderToken, role: { label: senderLabel } = {} } = sender;
  const messageStyle =
    messageTrayOpen ? styles.messageTrayOpen : styles.messageTrayClosed;

  const renderText = linkifyHtml(text, { target: '_blank' });

  const openMessageTray = () => otherProps.openMessageTray(messageId);
  const closeMessageTray = () => messageTrayOpen ? otherProps.closeMessageTray(messageId) : undefined;
  const deleteMessage = () => {
    otherProps.publishDeleteMessage(messageId);
    otherProps.deleteMessage(messageId, currentChannel);
  };
  const muteUser = () => {
    otherProps.muteUser(currentChannel, senderName);
    otherProps.mutedNotificationBanner(senderName);
    otherProps.publishMuteUserNotification(currentUserName, senderName, hostChannel);
    closeMessageTray();
  };
  const directChat = () => otherProps.directChat(senderToken, senderName);

  const OpenMessageTrayButton = () => (
    <Actionable onClick={openMessageTray} keepFocus={true}>
      <button
        className={styles.openTrayButton}
        dangerouslySetInnerHTML={{ __html: OpenTrayButton }}
      />
    </Actionable>
  );

  const MessageBody = () => (
    <React.Fragment>
      <Avatar user={sender} />

      <div className={styles.body}>
        <strong className={styles.name}>{senderName}</strong>
        {senderLabel &&
          <span className={styles.role}>{senderLabel}</span>
        }
        <div key={messageId} data-node='text' className={styles.text} dangerouslySetInnerHTML={{ __html: sanitizeString(renderText) }} />
      </div>
    </React.Fragment>
  );

  return (
    <div data-component='messageContainer' className={styles.wrapper + ' ' + messageStyle}>
      <Actionable onClick={closeMessageTray}  keepFocus={true} tabable={false}>
        <div
          className={styles.message}
        >
          <MessageBody />
          <OpenMessageTrayButton />
        </div>
      </Actionable>

      <MessageTray
        closeTray={closeMessageTray}
        deleteMessage={deleteMessage}
        muteUser={muteUser}
        directChat={directChat}
      />

    </div>
  );
};

export default Message;
