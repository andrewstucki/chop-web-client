import { createSelector } from 'reselect';
import { getChannelById } from './channelSelectors';
import { getCurrentSubscriber } from '../subscriber/dux';
import { i18n } from '../index';

const PUBLIC = 'PUBLIC';
const HOST = 'HOST';
const DIRECT = 'DIRECT';
const UNKNOWN = 'UNKNOWN';

const getChannelType = createSelector(
  getChannelById,
  channel => {
    if (channel) {
      if (channel.name === 'Public') {
        return PUBLIC;
      } else if (channel.name === 'Host') {
        return HOST;
      } else if (channel.direct) {
        return DIRECT;
      }
    }
    return UNKNOWN;
  }
);

const getOtherSubscribers = createSelector(
  getChannelById,
  getCurrentSubscriber,
  (channel, currentSubscriber) => channel && channel.subscribers ?
    channel.subscribers
      .filter(subscriber => subscriber.id !== currentSubscriber.id)
    : []
);

const hasOtherSubscribers = createSelector(
  getOtherSubscribers,
  subscribers => subscribers.length > 0
);

const getOtherSubscribersNames = createSelector(
  getOtherSubscribers,
  subscribers => subscribers.map(subscriber => subscriber.nickname)
);

const getPlaceholder = createSelector(
  getChannelType,
  getOtherSubscribersNames,
  (channelType, otherSubscriberNames) => {
    switch (channelType) {
      case HOST:
        return i18n.t('chat_with', { nickname: 'hosts'});
      case DIRECT:
        return `${i18n.t('chat_with')}${otherSubscriberNames.join(', ').replace(/,\\s([^,]*)$/, ' and $1')}`;
      case PUBLIC:
      default:
        return i18n.t('chat');
    }
  }
);

export {
  getPlaceholder,
  getOtherSubscribers,
  hasOtherSubscribers,
  getCurrentSubscriber,
};
