// @flow

import {
  receivePrayerRequestNotification,
} from '../moment/actionableNotification/dux';
import {
  receivePrayerRequestNotification as receivePrayerRequestNotificationText,
} from '../moment/notification/dux';
import { getHostChannel, getTranslateLanguage } from '../selectors/channelSelectors';
import utc from 'dayjs/plugin/utc';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { MessageType } from '../moment/message/dux';
import type {
  UIDType,
  DateTimeType,
  DateTimeAsStringType,
  URLType,
  ChannelGroupType,
  ChannelIdType,
  SubscriberLabelType,
  LanguageCodeType,
  RoomType,
} from '../cwc-types';

// $FlowFixMe
dayjs.extend(customParseFormat);
// $FlowFixMe
dayjs.extend(utc);

// Flow Type Definitions

type TranslationListType = any;

type NewMessageType = string;

export type PubnubReciveMessageType<M> = {
  actualChannel: null,
  channel: ChannelIdType,
  message: M,
  publisher: string,
  subscribedChannel: ChannelIdType,
  subscription: ChannelGroupType,
  timetoken: DateTimeAsStringType,
};

export type PubnubPublishMessageType<M, T = empty> = {
  channel: ChannelIdType,
  message: M,
  storeInHistory?: boolean,
  sendByPost?: boolean,
  meta?: T,
  ttl?: number,
};

export type LegacyMessageType<A, D> = {
  action: A,
  channel: ChannelIdType,
  data: D,
};

export type LegcayNewMessageDataType = {
  type?: NewMessageType,
  channelToken: ChannelIdType,
  eventStartTime: DateTimeType,
  eventTimeId: UIDType,
  eventTimeOffset: UIDType,
  eventTitle: string,
  fromAvatar: URLType,
  fromNickname: string,
  fromToken: UIDType,
  isHost: boolean,
  isUser: boolean,
  isVolunteer: boolean,
  isMuted?: boolean,
  label: SubscriberLabelType,
  language: LanguageCodeType,
  messageText: string,
  msgId: UIDType,
  organizationId: number,
  organizationName: string,
  roomType: RoomType,
  timestamp: DateTimeAsStringType,
  uniqueMessageToken: UIDType,
  userId: number | null,
  translations?: TranslationListType,
}

export type LegacyNewMessageType = LegacyMessageType<'newMessage', LegcayNewMessageDataType>;

let _getState;

// $FlowFixMe
const timestampToString = (inTimestamp: DateTimeType): DateTimeAsStringType => dayjs.utc(inTimestamp).toISOString();

// $FlowFixMe
const timestampFromString = (inTimestamp: DateTimeAsStringType): DateTimeType => dayjs.utc(inTimestamp).local().valueOf();

const Converter = {
  config: (getState: () => any) => {
    _getState = getState;
  },

  cwcMessageToLegacyNewMessage:( message: MessageType, channelId: ChannelIdType): LegcayNewMessageDataType => (
    {
      messageText: message.text,
      language: getTranslateLanguage(_getState()),
      eventTimeId: _getState().event.eventTimeId,
      // message timestamp is stored in milliseconds, starTime is stored in seconds
      // $FlowFixMe
      eventTimeOffset: dayjs(message.timestamp).diff(dayjs.unix(_getState().event.startTime), 'second').toString(),
      eventTitle: _getState().event.title,
      uniqueMessageToken: message.id,
      fromNickname: message.subscriber.nickname,
      fromToken: message.subscriber.id,
      msgId: message.id,
      timestamp: timestampToString(message.timestamp),
      fromAvatar: typeof message.subscriber.avatar === 'string' ? message.subscriber.avatar : 'https://s3.amazonaws.com/chop-v3-media/users/avatars/thumb/missing.png',
      isHost: true,
      label: message.subscriber.role.label,
      isVolunteer: true,
      isUser: true,
      userId: _getState().subscriber.currentSubscriber.userId || 0,
      organizationId: _getState().feed.organization.id,
      organizationName: _getState().feed.organization.name,
      roomType: 'public',
      channelToken: channelId,
      eventStartTime: _getState().event.startTime,
      platform: 'CWC',
    }
  ),

  cwcToLegacyReaction: (reaction: any, channelId: string) => (
    {
      nickname: reaction.subscriber.nickname,
      channelToken: channelId,
      reactionId: reaction.id,
    }
  ),

  cwcToLegacySystemMessage:(message: any) => (
    {
      fromNickname: 'System',
      messageText: `${message.host.nickname} started a live prayer with ${message.guest.nickname}`,
      timestamp: Converter.getTimestamp(),
    }
  ),

  cwcToLegacyLeaveChannel:(moment: any, channelId: string) => (
    {
      messageText: `${moment.nickname} has left the chat`,
      timestamp: Converter.getTimestamp(),
      userId: moment.user_id,
      fromNickname: moment.nickname,
      type: 'system',
      roomType: 'public',
      channelToken: channelId,
    }
  ),

  cwcToLegacyMuteSubscriber:(moment: any) => {
    const hostChannel = getHostChannel(_getState());
    return {
      nickname: moment.guest,
      fromNickname: moment.host,
      channelToken: hostChannel,
      timestamp: Converter.getTimestamp(),
    };
  },

  legacyNewMessageToCwcMessage: (message: LegcayNewMessageDataType): MessageType => (
    {
      type: 'MESSAGE',
      id: message.uniqueMessageToken,
      timestamp: timestampFromString(message.timestamp),
      lang: message.language,
      text: message.messageText,
      translations: message.translations ? message.translations : [],
      isMuted: !!message.isMuted,
      messageTrayOpen: false,
      subscriber: {
        id: message.fromToken,
        nickname: message.fromNickname,
        avatar: message.fromAvatar,
        role: {
          label: message.label ? message.label : '',
        },
      },
    }
  ),

  legacyToCwcPrayer: (message: any) => {
    const hostChannel = getHostChannel(_getState());

    return receivePrayerRequestNotification(
      {
        id: message.data.fromToken,
        nickname: message.data.fromNickname,
        avatar: null,
        role: {
          label: '',
        },
      },
      message.data.channel,
      hostChannel,
    );
  },

  legacyToCwcPrayerNotification: (message: any) => {
    const hostChannel = getHostChannel(_getState());

    return receivePrayerRequestNotificationText(
      {
        id: message.data.fromToken,
        nickname: message.data.fromNickname,
        avatar: null,
        role: {
          label: '',
        },
      },
      hostChannel,
    );
  },

  getTimestamp: () => dayjs().utc().toISOString(),

};

export default Converter;
