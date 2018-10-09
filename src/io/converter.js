// @flow

let _getState;

const Converter = {
  config: (getState: () => any) => {
    _getState = getState;
  },

  cwcToLegacy:( message: any, channelId: string) => {
    const time = new Date();
    const offset = (time.getTime() - _getState().event.startTime).toString();
    const twoDigitNumber = num => num < 10 ? '0' + num : num.toString();
    const month = monthIndex => twoDigitNumber(monthIndex + 1);
    const timestamp = `${time.getUTCFullYear()}-${month(time.getUTCMonth())}-${twoDigitNumber(time.getUTCDate())} ${time.getUTCHours()}:${time.getUTCMinutes()}:${time.getUTCSeconds()} +0000`;
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
      timestamp,
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

  legacyToCwc: (message: any) => (
    {
      type: 'MESSAGE',
      id: message.msgId,
      lang: message.language,
      text: message.messageText,
      translations: message.translations,
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
};

export default Converter;