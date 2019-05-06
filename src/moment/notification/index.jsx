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
import { Wrapper, Icon, Timestamp, Text } from './styles';
import { Trans, useTranslation } from 'react-i18next';

type NotificationPropsType = {
  notification: NotificationType,
};

type PrayerNotificationPropsType = {
  host: string,
  guest: string,
  timestamp: string,
};

const PrayerNotification = (
  {
    host,
    guest,
    timestamp,
  }: PrayerNotificationPropsType
) => (
  <Wrapper>
    <Icon
      dangerouslySetInnerHTML={
        { __html: ChatNotification }
      }
    />
    <Text>
      <div>
        <Trans ns='moments' i18nKey='prayer.notification'>
          {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
          <strong>{{host}}</strong> started a live prayer with <strong>{{guest}}</strong>
        </Trans>
      </div>
      <Timestamp>{timestamp}</Timestamp>
    </Text>
  </Wrapper>
);

type PrayerRequestNotificationPropsType = {
  guest: string,
  timestamp: string,
};

const PrayerRequestNotification = (
  {
    guest,
    timestamp,
  }: PrayerRequestNotificationPropsType
) => (
  <Wrapper>
    <Icon
      dangerouslySetInnerHTML={
        { __html: ChatNotification }
      }
    />
    <Text>
      <div>
        <strong>{guest} </strong>has request prayer.
      </div>
      <Timestamp>{timestamp}</Timestamp>
    </Text>
  </Wrapper>
);


type MuteUserNotificationPropsType = {
  host: string,
  guest: string,
  timestamp: string,
};

const MuteUserNotification = (
  {
    host,
    guest,
    timestamp,
  }: MuteUserNotificationPropsType
) => (
  <Wrapper>
    <Icon
      dangerouslySetInnerHTML={
        { __html: MuteUserNotificationIcon }
      }
    />
    <Text>
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
      <Timestamp>{timestamp}</Timestamp>
    </Text>
  </Wrapper>
);

type JoinedChatNotificationPropsType = {
  name: string,
  timestamp: string,
};

const JoinedChatNotification = (
  {
    name,
    timestamp,
  }: JoinedChatNotificationPropsType
) => {
  const { t } = useTranslation('moments');
  return (
    <Wrapper>
      <Icon
        dangerouslySetInnerHTML={
          { __html: ChatNotification }
        }
      />
      <Text>
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
        <Timestamp>{timestamp}</Timestamp>
      </Text>
    </Wrapper>
  );
};

type LeftChatNotificationPropsType = {
  name: string,
  timestamp: string,
};

const LeftChannelNotification = (
  {
    name,
    timestamp,
  }: LeftChatNotificationPropsType
) => (
  <Wrapper>
    <Icon
      dangerouslySetInnerHTML={
        { __html: EndChatNotification }
      }
    />
    <Text>
      <div>
        <Trans ns='moments' i18nKey='left_chat.notification'>
          {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
          <strong>{{name}}</strong> has left the chat
        </Trans>
      </div>
      <Timestamp>{timestamp}</Timestamp>
    </Text>
  </Wrapper>
);

const getNotificationText = notification => {
  switch (notification.notificationType) {
    case PRAYER:
      return <PrayerNotification host={notification.host} guest={notification.guest} timestamp={notification.timestamp} />;
    case PRAYER_REQUEST:
      return <PrayerRequestNotification guest={notification.guest} timestamp={notification.timestamp} />;
    case MUTE:
      return <MuteUserNotification host={notification.host} guest={notification.guest} timestamp={notification.timestamp} />;
    case JOINED_CHAT:
      return <JoinedChatNotification name={notification.name} timestamp={notification.timestamp} />;
    case LEFT_CHANNEL:
      return <LeftChannelNotification name={notification.name} timestamp={notification.timestamp} />;
    default:
      return null;
  }
};

const Notification = ({ notification }: NotificationPropsType) => (
  getNotificationText(notification)
);

export default React.memo < NotificationPropsType > (Notification);
