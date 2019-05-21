import React from 'react';

import type { SharedUserType } from '../../users/dux';
import { Trans, useTranslation } from 'react-i18next';
import { Button, ActionContainer, Text, SmallText, REGRESS, DANGER } from '../styles';
import { Modal } from '../popUpModal';

type MuteUserPropsType = {
  togglePopUpModal: () => void,
  muteUser: (channel: string, nickname: string) => void,
  publishMuteUserNotification: (host: string, guest: string, channel: string) => void,
  mutedNotificationBanner: (guestName: string) => void,
  user: string,
  hostChannel: string,
  currentChannel: string,
  currentUser: SharedUserType,
  isSmall: boolean,
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
    isSmall,
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
    <Modal togglePopUpModal={togglePopUpModal} isSmall={isSmall} id="muteUser-modal">
      <Text data-testid='muteUser-confirmText'>
        <Trans ns='forms' i18nKey='mute_user.confirm'>
          Are you sure you want to mute <strong>{{ user }}</strong>?
        </Trans>
        <SmallText data-testid='muteUser-allMessages'>
          { t('mute_user.all_messages') }
        </SmallText>
      </Text>
      <ActionContainer>
        <Button type={REGRESS} onClick={togglePopUpModal} data-testid='muteUser-cancel' >
          { t('mute_user.cancel') }
        </Button>
        <Button type={DANGER} onClick={callMuteUser} data-testid='muteUser-mute'>
          { t('mute_user.mute') }
        </Button>
      </ActionContainer>
    </Modal>
  );
};

export default MuteUserPopUpModal;
