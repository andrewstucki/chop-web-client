// @flow

import {
  receivePrayerRequestNotification,
} from '../moment/actionableNotification/dux';
import {
  receivePrayerRequestNotification as receivePrayerRequestNotificationText,
} from '../moment/notification/dux';
import { getHostChannel } from '../selectors/channelSelectors';
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
  UserLabelType,
  LanguageCodeType,
  RoomType,
} from '../cwc-types';

dayjs.extend(customParseFormat);
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
  label: UserLabelType,
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

const timestampToString = (inTimestamp: DateTimeType): DateTimeAsStringType => dayjs.utc(inTimestamp).toISOString();

const timestampFromString = (inTimestamp: DateTimeAsStringType): DateTimeType => dayjs.utc(inTimestamp).local().valueOf();

const Converter = {
  config: (getState: () => any) => {
    _getState = getState;
  },

  cwcMessageToLegacyNewMessage:( message: MessageType, channelId: ChannelIdType): LegcayNewMessageDataType => (
    {
      messageText: message.text,
      language: _getState().feed.currentLanguage,
      eventTimeId: _getState().feed.event.eventTimeId,
      // message timestamp is stored in milliseconds, starTime is stored in seconds
      eventTimeOffset: dayjs(message.timestamp).diff(dayjs.unix(_getState().feed.event.startTime), 'second').toString(),
      eventTitle: _getState().feed.event.title,
      uniqueMessageToken: message.id,
      fromNickname: message.sender.name,
      fromToken: message.sender.pubnubToken,
      msgId: message.id,
      timestamp: timestampToString(message.timestamp),
      fromAvatar: typeof message.sender.avatar === 'string' ? message.sender.avatar : 'https://s3.amazonaws.com/chop-v3-media/users/avatars/thumb/missing.png',
      isHost: true,
      label: message.sender.role.label,
      isVolunteer: true,
      isUser: true,
      userId: message.sender.id,
      organizationId: _getState().feed.organization.id,
      organizationName: _getState().feed.organization.name,
      roomType: 'public',
      channelToken: channelId,
      eventStartTime: _getState().feed.event.startTime,
      platform: 'CWC',
    }
  ),

  cwcToLegacyReaction: (reaction: any, channelId: string) => (
    {
      nickname: reaction.user.name,
      channelToken: channelId,
      reactionId: reaction.id,
    }
  ),

  cwcToLegacySystemMessage:(message: any) => (
    {
      fromNickname: 'System',
      messageText: `${message.host.name} started a live prayer with ${message.guest.name}`,
      timestamp: Converter.getTimestamp(),
    }
  ),

  cwcToLegacyLeaveChannel:(moment: any, channelId: string) => (
    {
      messageText: `${moment.name} has left the chat`,
      timestamp: Converter.getTimestamp(),
      userId: moment.pubnubToken,
      fromNickname: moment.name,
      type: 'system',
      roomType: 'public',
      channelToken: channelId,
    }
  ),

  cwcToLegacyMuteUser:(moment: any) => {
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
      sender: {
        id: message.userId || 0,
        name: message.fromNickname,
        avatar: message.fromAvatar,
        pubnubToken: message.fromToken,
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
        id: 12345, // Legacy doesn't forward the user id
        name: message.data.fromNickname,
        avatar: null,
        pubnubToken: message.data.fromToken,
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
        id: 12345, // Legacy doesn't forward the user id
        name: message.data.fromNickname,
        avatar: null,
        pubnubToken: message.data.fromToken,
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
