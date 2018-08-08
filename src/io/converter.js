// @flow
import { MessageType } from '../moment';

type ConfigurationType = {
  event: {
    id: string,
    startTime: number,
    title: string,
  },
  organization: {},
};

let configuration = {};
const Converter = {
  config: (data: ConfigurationType) => {
    configuration = Object.assign({}, data);
  },

  cwcToLegacy:( message: MessageType) => {
    const time = new Date();
    const offset = (time.getTime() - configuration.event.startTime).toString();
    const twoDigitNumber = num => num < 10 ? '0' + num : num.toString();
    const month = monthIndex => twoDigitNumber(monthIndex + 1);
    const timestamp = `${time.getUTCFullYear()}-${month(time.getUTCMonth())}-${twoDigitNumber(time.getUTCDate())} ${time.getUTCHours()}:${time.getUTCMinutes()}:${time.getUTCSeconds()} +0000`;

    return {
      messageText: message.text,
      language: message.lang,
      eventTimeId: configuration.event.id,
      eventTimeOffset: offset,
      eventTitle: configuration.event.title,
      uniqueMessageToken: message.id,
      fromNickname: message.user.name,
      fromToken: message.user.pubnubToken,
      msgId: message.id,
      timestamp,
      fromAvatar: null,
      isHost: true,
      label: message.user.role.label,
      eventStartTime: configuration.event.startTime,
    };
  },
};

export default Converter;