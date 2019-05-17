// @flow
import React from 'react';

import type { SharedUserType } from '../../users/dux';
import styles from '../style.css';
import { useTranslation, Trans } from 'react-i18next';
import dayjs from 'dayjs';

type LeaveChatPropsType = {
  togglePopUpModal: () => void,
  publishLeftChannelNotification: (name: string, pubnubToke: string, channelName: string, date: string) => void,
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
) => {
  const { t } = useTranslation('forms');
  const callLeaveChannel = () => {
    togglePopUpModal();
    publishLeftChannelNotification(currentUser.name, currentUser.pubnubToken, currentChannel, dayjs().toISOString());
    leaveChannel(currentChannel, isPlaceholder);
  };

  return (
    <div className={styles.alert} data-testid='leaveChat'>
      {hasOtherUsers &&
      <div className={styles.text} data-testid='leaveChat-confirmText'>
        <Trans ns='forms' i18nKey='leave_chat.confirm_user'>
          {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
          Are you sure you want to end your chat with <strong>{{name: otherUser.name}}</strong>?
        </Trans>
      </div>
      }
      {!hasOtherUsers &&
      <div className={styles.text}>
        { t('leave_chat.confirm') }
      </div>
      }
      <div className={styles.actionContainer}>
        <button
          className={styles.primary}
          onClick={togglePopUpModal}
          data-testid='leaveChat-keepChatting'
        >
          { t('leave_chat.keep_chatting') }
        </button>
        <button
          className={styles.primary}
          onClick={callLeaveChannel}
          data-testid='leaveChat-leaveButton'
        >
          { t('leave_chat.leave') }
        </button>
      </div>
    </div>
  );
};

export default LeaveChatPopUpModal;
