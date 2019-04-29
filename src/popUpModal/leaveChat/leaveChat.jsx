// @flow
import React from 'react';

import type { SharedUserType } from '../../users/dux';
import styles from '../style.css';

type LeaveChatPropsType = {
  togglePopUpModal: () => void,
  publishLeftChannelNotification: (name: string, pubnubToke: string, channelName: string, date: Date) => void,
  leaveChannel: (channelId: string, isPlaceholder: boolean) => void,
  otherUser: SharedUserType,
  hasOtherUsers: boolean,
  currentUser: SharedUserType,
  currentChannel: string,
  isPlaceholder: boolean,
};

const LeaveChatPopUpModal = (
  {
    togglePopUpModal,
    publishLeftChannelNotification,
    leaveChannel,
    otherUser,
    hasOtherUsers,
    currentUser,
    currentChannel,
    isPlaceholder,
  }: LeaveChatPropsType
) => (
  <div className={styles.alert} data-testid='leave-chat-modal'>
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
        className={styles.primary}
        onClick={() => (togglePopUpModal())}
      >
        Keep chatting
      </button>
      <button
        className={styles.primary}
        onClick={() => (
          togglePopUpModal(),
          publishLeftChannelNotification(currentUser.name, currentUser.pubnubToken, currentChannel, new Date),
          leaveChannel(currentChannel, isPlaceholder)
        )}
      >
        Leave
      </button>
    </div>
  </div>
);

export default LeaveChatPopUpModal;