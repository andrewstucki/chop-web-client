// @flow
import React from 'react';

import type { SharedSubscriberType, PrivateSubscriberType } from '../../subscriber/dux';
import { useTranslation, Trans } from 'react-i18next';
import { Button, ActionContainer, Text, PROGRESS, REGRESS } from '../styles';
import Modal from '../modal';
import dayjs from 'dayjs';

type LeaveChatPropsType = {
  togglePopUpModal: () => void,
  publishLeftChannelNotification: (nickname: string, id: string, channelName: string, date: string, label: string) => void,
  leaveChannel: (channelId: string, isPlaceholder: boolean) => void,
  otherSubscriber: SharedSubscriberType,
  hasOtherSubscribers: boolean,
  currentSubscriber: PrivateSubscriberType,
  currentChannel: string,
  isPlaceholder: boolean,
  isSmall: boolean,
};

const LeaveChatPopUpModal = (
  {
    togglePopUpModal,
    publishLeftChannelNotification,
    leaveChannel,
    otherSubscriber,
    hasOtherSubscribers,
    currentSubscriber,
    currentChannel,
    isPlaceholder,
    isSmall,
  }: LeaveChatPropsType
) => {
  const { t } = useTranslation('forms');
  const callLeaveChannel = () => {
    togglePopUpModal();
    publishLeftChannelNotification(currentSubscriber.nickname, currentSubscriber.id, currentChannel, dayjs().toISOString(), currentSubscriber.role?.label || '');
    leaveChannel(currentChannel, isPlaceholder);
  };

  return (
    <Modal togglePopUpModal={togglePopUpModal} isSmall={isSmall} id="leaveChat-modal">
      {hasOtherSubscribers &&
        <Text data-testid='leaveChat-confirmText'>
          <Trans ns='forms' i18nKey='leave_chat.confirm_user'>
            {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
            Are you sure you want to end your chat with <strong>{{name: otherSubscriber.nickname}}</strong>?
          </Trans>
        </Text>
      }
      {!hasOtherSubscribers &&
        <Text>
          { t('leave_chat.confirm') }
        </Text>
      }
      <ActionContainer>
        <Button buttonType={REGRESS} onClick={togglePopUpModal} data-testid='leaveChat-keepChatting' >
          { t('leave_chat.keep_chatting') }
        </Button>
        <Button buttonType={PROGRESS} onClick={callLeaveChannel} data-testid='leaveChat-leaveButton' >
          { t('leave_chat.leave') }
        </Button>
      </ActionContainer>
    </Modal>
  );
};

export default LeaveChatPopUpModal;
