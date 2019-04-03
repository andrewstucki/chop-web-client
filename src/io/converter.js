// @flow

import { receivePrayerRequestNotification } from '../moment/actionableNotification/dux';
import { getHostChannel } from '../selectors/channelSelectors';
import { UTC_DATE_FORMAT, getUTCDate } from '../util';
import dayjs from 'dayjs';
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

const timestampToString = (inTimestamp: DateTimeType): DateTimeAsStringType => (
  dayjs(getUTCDate(new Date(inTimestamp))).format('YYYY-MM-DD HH:mm:ss +0000')
);

const timestampFromString = (inTimestamp: DateTimeAsStringType): DateTimeType => dayjs(inTimestamp).valueOf();

const Converter = {
  config: (getState: () => any) => {
    _getState = getState;
  },

  cwcMessageToLegacyNewMessage:( message: MessageType, channelId: ChannelIdType): LegcayNewMessageDataType => (
    {
      messageText: message.text,
      language: _getState().currentLanguage,
      eventTimeId: _getState().event.eventTimeId,
      // message timestamp is stored in milliseconds, starTime is stored in seconds
      eventTimeOffset: dayjs(message.timestamp).diff(dayjs.unix(_getState().event.startTime), 'second').toString(),
      eventTitle: _getState().event.title,
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
      organizationId: _getState().organization.id,
      organizationName: _getState().organization.name,
      roomType: 'public',
      channelToken: _getState().channels[channelId].id,
      eventStartTime: _getState().event.startTime,
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

  getTimestamp: () => dayjs(getUTCDate()).format(UTC_DATE_FORMAT),

};

export default Converter;
