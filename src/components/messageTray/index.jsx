// @flow
import React from 'react';

import DirectChatButton from '../../../assets/direct-chat-button.svg';
import DeleteButton from '../../../assets/delete-button.svg';
import MuteButton from '../../../assets/mute-button.svg';
import styles from './style.css';

const trayButton = (
  buttonType: string,
  imageType: string,
  image,
  text: string
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

const MessageTray = () => (
  <div className={styles.messageTray}>
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

export default MessageTray;
