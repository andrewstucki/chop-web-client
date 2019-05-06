// @flow
import React from 'react';

import {
  PRAYER,
  PRAYER_REQUEST,
  MUTE,
  JOINED_CHAT,
  LEFT_CHANNEL,
} from './dux';

import type {
  NotificationType,
} from './dux';

import ChatNotification from '../../../assets/chat-notification.svg';
import EndChatNotification from '../../../assets/end-chat-notification.svg';
import MuteUserNotificationIcon from '../../../assets/mute-user-notification.svg';
import {
  Wrapper,
  Timestamp,
  Text,
  Icon,
} from './styles';
import { Trans, useTranslation } from 'react-i18next';

type NotificationPropsType = {
  notification: NotificationType,
  isCompact: boolean,
};

type PrayerNotificationPropsType = {
  host: string,
  guest: string,
  timestamp: string,
  isCompact: boolean,
};

const PrayerNotification = (
  {
    host,
    guest,
    timestamp,
    isCompact,
  }: PrayerNotificationPropsType,
) => (
  <Wrapper data-testid={'notification'}>
    <Icon dangerouslySetInnerHTML={{ __html: ChatNotification }} isCompact={isCompact} data-testid={'notification-icon'}/>
    <Text isCompact={isCompact} data-testid={'notification-message'}>
      <div>
        <Trans ns='moments' i18nKey='prayer.notification'>
          {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
          <strong>{{host}}</strong> started a live prayer with <strong>{{guest}}</strong>
        </Trans>
      </div>
      <Timestamp data-testid={'notification-timestamp'}>{timestamp}</Timestamp>
    </Text>
  </Wrapper>
);

type PrayerRequestNotificationPropsType = {
  guest: string,
  timestamp: string,
  isCompact: boolean,
};

const PrayerRequestNotification = (
  {
    guest,
    timestamp,
    isCompact,
  }: PrayerRequestNotificationPropsType,
) => (
  <Wrapper data-testid={'notification'}>
    <Icon dangerouslySetInnerHTML={{ __html: ChatNotification }} isCompact={isCompact} data-testid={'notification-icon'}/>
    <Text isCompact={isCompact} data-testid={'notification-message'}>
      <Trans ns='moments' i18nKey='prayer.request'>
        {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
        <strong>{{guest}}</strong> has requested prayer.
      </Trans>
      <Timestamp data-testid={'notification-timestamp'}>{timestamp}</Timestamp>
    </Text>
  </Wrapper>
);


type MuteUserNotificationPropsType = {
  host: string,
  guest: string,
  timestamp: string,
  isCompact: boolean,
};

const MuteUserNotification = (
  {
    host,
    guest,
    timestamp,
    isCompact,
  }: MuteUserNotificationPropsType,
) => (
  <Wrapper data-testid={'notification'}>
    <Icon dangerouslySetInnerHTML={{ __html: MuteUserNotificationIcon }} isCompact={isCompact} data-testid={'notification-icon'}/>
    <Text isCompact={isCompact} data-testid={'notification-message'}>
      <div>
        {
          host ? (
            <Trans ns='moments' i18nKey='mute.notification_host'>
              {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
              <strong>{{host}}</strong> muted <strong>{{guest}}</strong>
            </Trans>
          ) : (
            <Trans ns='moments' i18nKey='mute.notification'>
              {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
              <strong>{{guest}}</strong> was muted
            </Trans>
          )
        }
      </div>
      <Timestamp data-testid={'notification-timestamp'}>{timestamp}</Timestamp>
    </Text>
  </Wrapper>
);

type JoinedChatNotificationPropsType = {
  name: string,
  timestamp: string,
  isCompact: boolean,
};

const JoinedChatNotification = (
  {
    name,
    timestamp,
    isCompact,
  }: JoinedChatNotificationPropsType,
) => {
  const { t } = useTranslation('moments');
  return (
    <Wrapper data-testid={'notification'}>
      <Icon dangerouslySetInnerHTML={{ __html: ChatNotification }} isCompact={isCompact} data-testid={'notification-icon'}/>
      <Text isCompact={isCompact} data-testid={'notification-message'}>
        <div>
          {
            name === 'You' ? (
              t('joined_chat.notification_you')
            ) : (
              <Trans ns='moments' i18nKey='joined_chat.notification'>
                {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
                <strong>{{name}}</strong> has joined the chat
              </Trans>
            )
          }
          {name === 'You' ?
            <span>{name} have joined the chat</span> : <span></span>
          }
        </div>
        <Timestamp data-testid={'notification-timestamp'}>{timestamp}</Timestamp>
      </Text>
    </Wrapper>
  );
};

type LeftChannelNotificationPropsType = {
  name: string,
  timestamp: string,
  isCompact: boolean,
};

const LeftChannelNotification = (
  {
    name,
    timestamp,
    isCompact,
  }: LeftChannelNotificationPropsType,
) => (
  <Wrapper data-testid={'notification'}>
    <Icon dangerouslySetInnerHTML={{ __html: EndChatNotification }} isCompact={isCompact} data-testid={'notification-icon'}/>
    <Text isCompact={isCompact} data-testid={'notification-message'}>
      <div>
        <Trans ns='moments' i18nKey='left_chat.notification'>
          {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
          <strong>{{name}}</strong> has left the chat
        </Trans>
      </div>
      <Timestamp data-testid={'notification-timestamp'}>{timestamp}</Timestamp>
    </Text>
  </Wrapper>
);

const getNotificationText = (notification, isCompact) => {
  switch (notification.notificationType) {
    case PRAYER:
      return <PrayerNotification host={notification.host} guest={notification.guest} timestamp={notification.timestamp} isCompact={isCompact} />;
    case PRAYER_REQUEST:
      return <PrayerRequestNotification guest={notification.guest} timestamp={notification.timestamp} isCompact={isCompact} />;
    case MUTE:
      return <MuteUserNotification host={notification.host} guest={notification.guest} timestamp={notification.timestamp} isCompact={isCompact} />;
    case JOINED_CHAT:
      return <JoinedChatNotification name={notification.name} timestamp={notification.timestamp} isCompact={isCompact} />;
    case LEFT_CHANNEL:
      return <LeftChannelNotification name={notification.name} timestamp={notification.timestamp} isCompact={isCompact} />;
    default:
      return null;
  }
};

const Notification = ({ notification, isCompact }: NotificationPropsType) => (
  getNotificationText(notification, isCompact)
);

export default React.memo < NotificationPropsType > (Notification);
