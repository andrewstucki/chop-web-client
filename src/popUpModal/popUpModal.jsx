// @flow
import React from 'react';

import type { SharedUserType } from '../feed/dux';
import styles from './style.css';

type PopUpModalPropsType = {
  togglePopUpModal: () => void,
  publishLeftChannelNotification: (userName: string, channelName: string) => void,
  removeChannel: (channelName: string) => void,
  publishLeaveChannel: (user: SharedUserType, channel: string) => void,
  otherUser: SharedUserType,
  currentUser: SharedUserType,
  currentChannel: string,
  isPopUpModalVisible: boolean,
};

const PopUpModal = (
  {
    togglePopUpModal,
    removeChannel,
    publishLeaveChannel,
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
            <strong> {otherUser.name}</strong>?
          </div>
          <div className={styles.actionContainer}>
            <button
              className={styles.action}
              onClick={() => (togglePopUpModal())}
            >
              Keep chatting
            </button>
            <button
              className={styles.action}
              onClick={() => (
                togglePopUpModal(),
                removeChannel(currentChannel),
                publishLeaveChannel(currentUser, currentChannel)
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
