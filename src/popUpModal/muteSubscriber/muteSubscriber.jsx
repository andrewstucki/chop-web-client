// @flow
import React from 'react';

import { Trans, useTranslation } from 'react-i18next';
import { Button, ActionContainer, Text, SmallText, REGRESS, DANGER } from '../styles';
import { Modal } from '../popUpModal';

type MuteSubscriberPropsType = {
  togglePopUpModal: () => void,
  muteSubscriber: (channel: string, nickname: string) => void,
  publishMuteSubscriberNotification: (host: string, guest: string, channel: string) => void,
  mutedBanner: (guestName: string) => void,
  subscriber: string,
  hostChannel: string,
  channelId: string,
  currentSubscriber: string,
  isSmall: boolean,
};

const MuteSubscriberPopUpModal = (
  {
    togglePopUpModal,
    muteSubscriber,
    publishMuteSubscriberNotification,
    mutedBanner,
    subscriber,
    hostChannel,
    channelId,
    currentSubscriber,
    isSmall,
  }: MuteSubscriberPropsType
) => {
  const { t } = useTranslation('forms');
  const callMuteSubscriber = () => {
    togglePopUpModal();
    publishMuteSubscriberNotification(currentSubscriber, subscriber, hostChannel);
    muteSubscriber(channelId, subscriber);
    mutedBanner(subscriber);
  };

  return (
    <Modal togglePopUpModal={togglePopUpModal} isSmall={isSmall} id="muteSubscriber-modal">
      <Text data-testid='muteSubscriber-confirmText'>
        <Trans ns='forms' i18nKey='mute_subscriber.confirm'>
          {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
          Are you sure you want to mute <strong>{{ subscriber }}</strong>?
        </Trans>
        <SmallText data-testid='muteSubscriber-allMessages'>
          { t('mute_subscriber.all_messages') }
        </SmallText>
      </Text>
      <ActionContainer>
        <Button buttonType={REGRESS} onClick={togglePopUpModal} data-testid='muteSubscriber-cancel' >
          { t('mute_subscriber.cancel') }
        </Button>
        <Button buttonType={DANGER} onClick={callMuteSubscriber} data-testid='muteSubscriber-mute'>
          { t('mute_subscriber.mute') }
        </Button>
      </ActionContainer>
    </Modal>
  );
};

export default MuteSubscriberPopUpModal;
