// @flow
import React from 'react';

import type { SharedUserType } from '../../users/dux';
import { useTranslation, Trans } from 'react-i18next';
import { Button, ActionContainer, Text, PROGRESS, REGRESS } from '../styles';
import { Modal } from '../popUpModal';
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
  isSmall: boolean,
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
    isSmall,
  }: LeaveChatPropsType
) => {
  const { t } = useTranslation('forms');
  const callLeaveChannel = () => {
    togglePopUpModal();
    publishLeftChannelNotification(currentUser.name, currentUser.pubnubToken, currentChannel, dayjs().toISOString());
    leaveChannel(currentChannel, isPlaceholder);
  };

  return (
    <Modal togglePopUpModal={togglePopUpModal} isSmall={isSmall} id="leaveChat-modal">
      {hasOtherUsers &&
        <Text data-testid='leaveChat-confirmText'>
          <Trans ns='forms' i18nKey='leave_chat.confirm_user'>
            {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
            Are you sure you want to end your chat with <strong>{{name: otherUser.name}}</strong>?
          </Trans>
        </Text>
      }
      {!hasOtherUsers &&
        <Text>
          { t('leave_chat.confirm') }
        </Text>
      }
      <ActionContainer>
        <Button type={REGRESS} onClick={togglePopUpModal} data-testid='leaveChat-keepChatting' >
          { t('leave_chat.keep_chatting') }
        </Button>
        <Button type={PROGRESS} onClick={callLeaveChannel} data-testid='leaveChat-leaveButton' >
          { t('leave_chat.leave') }
        </Button>
      </ActionContainer>
    </Modal>
  );
};

export default LeaveChatPopUpModal;
