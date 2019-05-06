// @flow
import React from 'react';

import type { ActionableNotificationType } from './dux';

import ChatNotification from '../../../assets/chat-notification.svg';
import type {SharedUserType} from '../../users/dux';
import { Trans, useTranslation } from 'react-i18next';
import { Wrapper as NotificationWrapper, Text, Timestamp, Icon } from '../notification/styles';
import { ActionableWrapper, ActionableContainer, AcceptButton, AcceptedText } from './styles';

type ActionableNotificationPropsType = {
  notification: ActionableNotificationType,
  acceptPrayerRequest: (prayerChannel: string, hostChannel:string, user: SharedUserType, accepted: boolean) => void,
  hostChannel: string,
};

const ActionableNotification = (
  {
    notification,
    acceptPrayerRequest,
    hostChannel,
  }: ActionableNotificationPropsType
) => {
  const {
    active,
    cancelled,
    user,
    timestamp,
    prayerChannel,
  } = notification;

  const { t } = useTranslation('moments');

  const Wrapper =
    active ? ActionableWrapper : NotificationWrapper;

  const acceptedText =
    cancelled ? t('actionable.cancelled') : t('actionable.accepted');

  const callAcceptPrayerRequest = () => acceptPrayerRequest(prayerChannel, hostChannel, user, false);

  return (
    <Wrapper data-testid='actionableNotification'>
      <ActionableContainer>
        <Icon
          dangerouslySetInnerHTML={
            { __html: ChatNotification }
          }
        />
        <Text>
          <div data-testid='actionableNotification-text'>
            <Trans ns='moments' i18nKey='prayer.request'>
              {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
              <strong>{{name: user.name}}</strong> has requested prayer
            </Trans>
          </div>
          <Timestamp data-testid='actionableNotification-timestamp'>{timestamp}</Timestamp>
        </Text>
        {
          active &&
            <AcceptButton
              data-testid='actionableNotification-accept'
              onClick={callAcceptPrayerRequest}
            >
              {t('actionable.accept')}
            </AcceptButton>
        }
        <AcceptedText hide={active} data-testid='actionableNotification-accepted'>{acceptedText}</AcceptedText>
      </ActionableContainer>
    </Wrapper>
  );
};

export default React.memo < ActionableNotificationPropsType > (ActionableNotification);
