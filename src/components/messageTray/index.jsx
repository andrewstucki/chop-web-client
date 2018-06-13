// @flow
import React from 'react';

import DirectChatButton from '../../../assets/direct-chat-button.svg';
import DeleteButton from '../../../assets/delete-button.svg';
import MuteButton from '../../../assets/mute-button.svg';
import CloseMessageTray from '../../../assets/close-message-tray-button.svg';
import styles from './style.css';

type MessageTrayPropsType = {
  trayButtonOnClick: (id: string) => void,
  messageTrayOpen: boolean,
};

const trayButton = (
  buttonType: string,
  imageType: string,
  image,
  text: string,
) => (
  <button
    className={buttonType}
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
    trayButtonOnClick,
    messageTrayOpen,
  }: MessageTrayPropsType
) => {
  const trayStyle = messageTrayOpen ? styles.open : styles.closed;

  return (
    <div className={trayStyle}>
      <button
        className={styles.closeMessageTray}
        onClick={trayButtonOnClick}
      >
        <span 
          dangerouslySetInnerHTML={{ __html: CloseMessageTray }}
          className={styles.closeTrayImage}
        />
      </button>
      {
        trayButton(
          styles.directChatButton,
          styles.directChatImage,
          DirectChatButton,
          'Direct chat'
        )
      }
      {
        trayButton(
          styles.deleteButton,
          styles.deleteImage,
          DeleteButton,
          'Delete message'
        )
      }
      {
        trayButton(
          styles.muteButton,
          styles.muteImage,
          MuteButton,
          'Mute guest'
        )
      }
    </div>
  );
};

export default MessageTray;
