// @flow
import React from 'react';

import type { UserType } from '../feed/dux';
import styles from './style.css';

type PopUpModalPropsType = {
  togglePopUpModal: (isPopUpModalVisible: boolean) => void,
  leaveChat: (user: UserType) => void,
  publishLeftChatNotification: (userName: string, channelName: string) => void,
  removeChannel: (channelName: string) => void,
  otherUser: UserType,
  currentUser: UserType,
  currentChannel: string,
  isPopUpModalVisible: boolean,
};

const PopUpModal = (
  {
    togglePopUpModal,
    leaveChat,
    publishLeftChatNotification,
    removeChannel,
    otherUser,
    currentUser,
    isPopUpModalVisible,
    currentChannel,
  }: PopUpModalPropsType
) => {
  if (isPopUpModalVisible) {
    return (
      <div className={styles.popUpModal}>
        <div className={styles.alert}>
          <div className={styles.text}>
            Are you sure you want to end your chat with
            <strong> {otherUser.nickname}</strong>?
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
              onClick={() => (
                togglePopUpModal(isPopUpModalVisible),
                publishLeftChatNotification(currentUser.nickname, currentChannel),
                leaveChat(currentUser),
                removeChannel(currentChannel)
              )}
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
