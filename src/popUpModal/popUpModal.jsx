// @flow
import React from 'react';

import type { SharedUserType } from '../feed/dux';
import styles from './style.css';

type PopUpModalPropsType = {
  togglePopUpModal: () => void,
  publishLeftChannelNotification: (name: string, pubnubToke: string, channelName: string, date: Date) => void,
  removeChannel: (channelName: string) => void,
  otherUser: SharedUserType,
  hasOtherUsers: boolean,
  currentUser: SharedUserType,
  currentChannel: string,
  isPopUpModalVisible: boolean,
};

const PopUpModal = (
  {
    togglePopUpModal,
    removeChannel,
    publishLeftChannelNotification,
    otherUser,
    hasOtherUsers,
    currentUser,
    isPopUpModalVisible,
    currentChannel,
  }: PopUpModalPropsType
) => {
  if (isPopUpModalVisible) {
    return (
      <div className={styles.popUpModal}>
        <div className={styles.alert}>
          { hasOtherUsers &&
            <div className={styles.text}>
              Are you sure you want to end your chat with
              <strong> {otherUser.name}</strong>?
            </div>
          }
          { !hasOtherUsers &&
            <div className={styles.text}>
              Are you sure you want to end your chat?
            </div>
          }
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
                publishLeftChannelNotification(currentUser.name, currentUser.pubnubToken, currentChannel, new Date),
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
