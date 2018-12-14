// @flow

import { receivePrayerRequestNotification } from '../moment/actionableNotification/dux';
import { getHostChannel } from '../selectors/channelSelectors';
import { UTC_DATE_FORMAT } from '../util';
import moment from 'moment';

let _getState;

const Converter = {
  config: (getState: () => any) => {
    _getState = getState;
  },

  cwcToLegacy:( message: any, channelId: string) => {
    const time = new Date();
    const offset = (time.getTime() - _getState().event.startTime).toString();
    const roomType = 'public';

    return {
      messageText: message.text,
      language: _getState().currentLanguage,
      eventTimeId: _getState().event.id,
      eventTimeOffset: offset,
      eventTitle: _getState().event.title,
      uniqueMessageToken: message.id,
      fromNickname: message.user.name,
      fromToken: message.user.pubnubToken,
      msgId: message.id,
      timestamp: Converter.getTimestamp(),
      fromAvatar: message.user.avatarUrl,
      isHost: true,
      label: message.user.role.label,
      isVolunteer: true,
      isUser: true,
      userId: message.user.id,
      organizationId: _getState().organization.id,
      organizationName: _getState().organization.name,
      roomType: roomType,
      channelToken: _getState().channels[channelId].id,
      eventStartTime: _getState().event.startTime,
    };
  },

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

  legacyToCwc: (message: any) => (
    {
      type: 'MESSAGE',
      id: message.uniqueMessageToken,
      lang: message.language,
      text: message.messageText,
      translations: message.translations,
      isMuted: message.isMuted,
      user: {
        id: message.userId,
        name: message.fromNickname,
        avatarUrl: message.fromAvatar,
        pubnubToken: message.fromToken,
        role: {
          label: message.label,
        },
      },
    }
  ),

  legacyToCwcPrayer: (message: any) => {
    const hostChannel = getHostChannel(_getState());

    return receivePrayerRequestNotification(
      {
        name: message.data.fromNickname,
        pubnubToken: message.data.fromToken,
        role: { 
          label: '',
        },
      }, 
      message.data.channel,
      hostChannel,
    );
  },

  getTimestamp: () => moment().utc().format(UTC_DATE_FORMAT),

};

export default Converter;
