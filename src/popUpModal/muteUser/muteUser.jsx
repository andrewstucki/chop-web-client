import React from 'react';

import type { SharedUserType } from '../../users/dux';

import styles from '../style.css';

type MuteUserPropsType = {
  togglePopUpModal: () => void,
  muteUser: (channel: string, nickname: string) => void,
  publishMuteUserNotification: (host: string, guest: string, channel: string) => void,
  mutedNotificationBanner: (guestName: string) => void,
  user: string,
  hostChannel: string,
  currentChannel: string,
  currentUser: SharedUserType,
};

const MuteUserPopUpModal = (
  {
    togglePopUpModal,
    muteUser,
    publishMuteUserNotification,
    mutedNotificationBanner,
    user,
    hostChannel,
    currentChannel,
    currentUser,
  }: MuteUserPropsType
) => (
  <div className={styles.alert} data-testid='mute-user-modal'>
    <div className={styles.text}>
      Are you sure you want to mute
      <strong> {user}</strong>?
    </div>
    <div className={styles.smallText}>
      All of their messages will be deleted.
    </div>
    <div className={styles.actionContainer}>
      <button
        className={styles.primary}
        onClick={() => (togglePopUpModal())}
      >
        Cancel
      </button>
      <button
        className={styles.danger}
        onClick={() => (
          togglePopUpModal(),
          publishMuteUserNotification(currentUser, user, hostChannel),
          muteUser(currentChannel, user),
          mutedNotificationBanner(user)
        )}
      >
        Mute
      </button>
    </div>
  </div>
);

export default MuteUserPopUpModal;
