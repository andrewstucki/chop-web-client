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
import MuteSubscriberNotificationIcon from '../../../assets/mute-subscriber-notification.svg';
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
      <Trans ns='moments' i18nKey='prayer.notification'>
        {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
        <strong>{{host}}</strong> started a live prayer with <strong>{{guest}}</strong>
      </Trans>
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


type MuteSubscriberNotificationPropsType = {
  host: string,
  guest: string,
  timestamp: string,
  isCompact: boolean,
};

const MuteSubscriberNotification = (
  {
    host,
    guest,
    timestamp,
    isCompact,
  }: MuteSubscriberNotificationPropsType,
) => (
  <Wrapper data-testid={'notification'}>
    <Icon dangerouslySetInnerHTML={{ __html: MuteSubscriberNotificationIcon }} isCompact={isCompact} data-testid={'notification-icon'}/>
    <Text isCompact={isCompact} data-testid={'notification-message'}>

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
      <Timestamp data-testid={'notification-timestamp'}>{timestamp}</Timestamp>
    </Text>
  </Wrapper>
);

type JoinedChatNotificationPropsType = {
  nickname: string,
  timestamp: string,
  isCompact: boolean,
};

const JoinedChatNotification = (
  {
    nickname,
    timestamp,
    isCompact,
  }: JoinedChatNotificationPropsType,
) => {
  const { t } = useTranslation('moments');
  return (
    <Wrapper data-testid={'notification'}>
      <Icon dangerouslySetInnerHTML={{ __html: ChatNotification }} isCompact={isCompact} data-testid={'notification-icon'}/>
      <Text isCompact={isCompact} data-testid={'notification-message'}>

        {
          nickname === 'You' ? (
            t('joined_chat.notification_you')
          ) : (
            <Trans ns='moments' i18nKey='joined_chat.notification'>
              {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
              <strong>{{nickname}}</strong> has joined the chat
            </Trans>
          )
        }
        {nickname === 'You' ?
          <span>{nickname} have joined the chat</span> : <span></span>
        }

        <Timestamp data-testid={'notification-timestamp'}>{timestamp}</Timestamp>
      </Text>
    </Wrapper>
  );
};

type LeftChannelNotificationPropsType = {
  nickname: string,
  timestamp: string,
  isCompact: boolean,
};

const LeftChannelNotification = (
  {
    nickname,
    timestamp,
    isCompact,
  }: LeftChannelNotificationPropsType,
) => (
  <Wrapper data-testid={'notification'}>
    <Icon dangerouslySetInnerHTML={{ __html: EndChatNotification }} isCompact={isCompact} data-testid={'notification-icon'}/>
    <Text isCompact={isCompact} data-testid={'notification-message'}>

      <Trans ns='moments' i18nKey='left_chat.notification'>
        {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
        <strong>{{nickname}}</strong> has left the chat
      </Trans>

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
      return <MuteSubscriberNotification host={notification.host} guest={notification.guest} timestamp={notification.timestamp} isCompact={isCompact} />;
    case JOINED_CHAT:
      return <JoinedChatNotification nickname={notification.nickname} timestamp={notification.timestamp} isCompact={isCompact} />;
    case LEFT_CHANNEL:
      return <LeftChannelNotification nickname={notification.nickname} timestamp={notification.timestamp} isCompact={isCompact} />;
    default:
      return null;
  }
};

const Notification = ({ notification, isCompact }: NotificationPropsType) => (
  getNotificationText(notification, isCompact)
);

export default React.memo < NotificationPropsType > (Notification);
