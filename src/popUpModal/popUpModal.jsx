// @flow
import React from 'react';

import type { UserType } from '../feed/dux';
import styles from './style.css';

type PopUpModalPropsType = {
  keepChatting: () => void,
  leaveChat: () => void,
  user: UserType,
  isPopUpModalVisible: boolean,
};

const PopUpModal = (
  {
    keepChatting,
    leaveChat,
    user,
    isPopUpModalVisible,
  }: PopUpModalPropsType
) => {
  if (isPopUpModalVisible) {
    return (
      <div className={styles.popUpModal}>
        <div className={styles.alert}>
          <div className={styles.text}>
            Are you sure you want to end your chat with <strong>{user.nickname}</strong>?
          </div>
          <div className={styles.actionContainer}>
            <button
              className={styles.action}
              onClick={keepChatting}
            >
              Keep chatting
            </button>
            <button
              className={styles.action}
              onClick={leaveChat}
            >
              Leave
            </button>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default PopUpModal;
