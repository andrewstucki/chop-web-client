// @flow
import React from 'react';

import DirectChatButton from '../../../assets/direct-chat-button.svg';
import DeleteButton from '../../../assets/delete-button.svg';
import MuteButton from '../../../assets/mute-button.svg';
import CloseButton from '../../../assets/close-message-tray-button.svg';
import styles from './style.css';
import { Actionable } from '../Actionable';

type MessageTrayPropsType = {
  closeTray: (id: string) => void,
  deleteMessage: (id: string, channel:string) => void,
  muteUser: (pubnubToken: string) => void,
  directChat: (pubnubToken: string, nickname: string) => void,
};

const trayButton = (
  buttonStyle: string,
  imageType: string,
  image,
  text: string,
  onClick,
) => (
  <Actionable onClick={onClick} keepFocus={true}>
    <button className={buttonStyle}>
      <span
        className={imageType}
        dangerouslySetInnerHTML={{ __html: image }}
      />
      <div>{text}</div>
    </button>
  </Actionable>
);

const MessageTray = (
  {
    closeTray,
    deleteMessage,
    muteUser,
    directChat,
  }: MessageTrayPropsType,
) => (
  <div className={styles.tray}>
    {
      trayButton(
        styles.closeButton,
        styles.closeImage,
        CloseButton,
        'Close',
        closeTray
      )
    }
    {
      trayButton(
        styles.muteButton,
        styles.muteImage,
        MuteButton,
        'Mute',
        muteUser
      )
    }
    {
      trayButton(
        styles.deleteButton,
        styles.deleteImage,
        DeleteButton,
        'Delete message',
        deleteMessage
      )
    }
    {
      trayButton(
        styles.directChatButton,
        styles.directChatImage,
        DirectChatButton,
        'Chat',
        directChat
      )
    }
  </div>
);

export default MessageTray;
