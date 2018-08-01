// @flow
import React from 'react';

import type { UserType } from '../feed/dux';
import styles from './style.css';

type PopUpModalPropsType = {
  togglePopUpModal: (isPopUpModalVisible: boolean) => void,
  leaveChat: (user: UserType) => void,
  otherUser: UserType,
  currentUser: UserType,
  isPopUpModalVisible: boolean,
};

const PopUpModal = (
  {
    togglePopUpModal,
    leaveChat,
    otherUser,
    currentUser,
    isPopUpModalVisible,
  }: PopUpModalPropsType
) => {
  if (isPopUpModalVisible) {
    return (
      <div className={styles.popUpModal}>
        <div className={styles.alert}>
          <div className={styles.text}>
            Are you sure you want to end your chat with <strong>{otherUser.nickname}</strong>?
          </div>
          <div className={styles.actionContainer}>
            <button
              className={styles.action}
              onClick={() => (togglePopUpModal(isPopUpModalVisible))}
            >
              Keep chatting
            </button>
            <button
              className={styles.action}
              onClick={() => (leaveChat(currentUser))}
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
