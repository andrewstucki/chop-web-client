// @flow
import React from 'react';

import DirectChatButton from '../../../assets/direct-chat-button.svg';
import DeleteButton from '../../../assets/delete-button.svg';
import MuteButton from '../../../assets/mute-button.svg';
import styles from './style.css';

type MessageTrayPropsType = {
  deleteMessage: (id: string) => void,
  muteUser: (pubnubToken: string) => void,
};

const trayButton = (
  buttonType: string,
  imageType: string,
  image,
  text: string,
  onClick?,
) => (
  <button
    className={buttonType}
    onClick={onClick}
  >
    <span
      className={imageType}
      dangerouslySetInnerHTML={{ __html: image }}
    />
    <p>{text}</p>
  </button>
);

const MessageTray = (
  {
    deleteMessage,
    muteUser,
  }: MessageTrayPropsType
) => (
  <div className={styles.tray}>
    
    {
      trayButton(
        styles.directChatButton,
        styles.directChatImage,
        DirectChatButton,
        'Chat'
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
        styles.muteButton,
        styles.muteImage,
        MuteButton,
        'Mute',
        muteUser
      )
    }
  </div>
);

export default MessageTray;
