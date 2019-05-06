import React from 'react';

import type { SharedUserType } from '../../users/dux';
import { Trans, useTranslation } from 'react-i18next';
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
) => {
  const { t } = useTranslation('forms');
  const callMuteUser = () => {
    togglePopUpModal();
    publishMuteUserNotification(currentUser, user, hostChannel);
    muteUser(currentChannel, user);
    mutedNotificationBanner(user);
  };

  return (
    <div className={styles.alert} data-testid='muteUser-modal'>
      <div className={styles.text} data-testid='muteUser-confirmText'>
        <Trans ns='forms' i18nKey='mute_user.confirm'>
          Are you sure you want to mute <strong>{{ user }}</strong>?
        </Trans>
      </div>
      <div className={styles.smallText} data-testid='muteUser-allMessages'>
        { t('mute_user.all_messages') }
      </div>
      <div className={styles.actionContainer}>
        <button
          className={styles.primary}
          onClick={togglePopUpModal}
          data-testid='muteUser-cancel'
        >
          { t('mute_user.cancel') }
        </button>
        <button
          className={styles.danger}
          onClick={callMuteUser}
          data-testid='muteUser-mute'
        >
          { t('mute_user.mute') }
        </button>
      </div>
    </div>
  );
};

export default MuteUserPopUpModal;
