// @flow
import { createSelector } from 'reselect';
import { getCurrentSubscriber, getMutedSubscribers } from '../subscriber/dux';
import type {
  ChannelsObjectType,
  ChannelType,
} from '../feed/dux';
import type { ChopStateType } from '../chop/dux';
import type {
  SharedSubscriberType,
} from '../subscriber/dux';
import type {
  ChannelIdType,
  LanguageCodeType,
  UIDType,
} from '../cwc-types';
import type { PaneType } from '../pane/dux';
import type { MomentType } from '../moment/dux';

const ID = 'feed';
const local = state => state[ID] || state;

const getChannels = (state: ChopStateType): ChannelsObjectType => local(state).channels;

const getChannelById = (state: ChopStateType, id: ChannelIdType): ChannelType => getChannels(state)[id];

const getCurrentLanguage = (state: ChopStateType): LanguageCodeType => local(state).currentLanguage;

const getPrimaryPane = (state: ChopStateType): PaneType => local(state).panes.primary;

const getSawLastMomentAt = createSelector(
  getChannelById,
  channel => channel ? channel.sawLastMomentAt : 0
);

const getChannelIdByNameFactory = (name: string): Function  => (
  createSelector<ChopStateType, void, ChannelIdType, ChannelsObjectType>(
    [getChannels],
    channels => {
      if (channels) {
        return Object.keys(channels).find(channel => channels[channel] ? channels[channel].name.toUpperCase() === name : null);
      }
    }
  )
);

const getChannelByNameFactory = (name: string): ChannelType => (
  createSelector<ChopStateType, void, ChannelType, ChannelsObjectType, string>(
    getChannels,
    getChannelIdByNameFactory(name),
    (channels, id) => channels[id]
  )
);

const translateMoment = (currentLanguage: LanguageCodeType) => (moment: MomentType): MomentType => {
  if (moment.type === 'MESSAGE' &&
      !currentLanguage.includes(moment.lang) &&
      moment.translations) {
    const translation = moment.translations.find(translation => currentLanguage.includes(translation.languageCode));
    if (translation && translation.text) {
      return {
        ...moment,
        text: translation.text,
      };
    }
  }
  return moment;
};

const getTranslateLanguage = createSelector(
  getCurrentLanguage,
  // Google Translate requires ISO 639 format except for Chinese where they need BCP 47
  // https://cloud.google.com/translate/docs/languages
  language => {
    const substringEnd = language.indexOf('-') > -1 ? language.indexOf('-') : language.length;
    return language.includes('zh') ? language : language.substring(0, substringEnd);
  }
);

const mutedMoment = (moment: MomentType): boolean => !moment.isMuted;

const removeMutedSubscribers = (mutedSubscribers: Array<UIDType>) => (moment: MomentType): boolean => {
  if (moment.subscriber) {
    return !mutedSubscribers.includes(moment.subscriber.nickname);
  } else {
    return true;
  }
};

const getHostChannelObject = createSelector<ChopStateType, void, ChannelType, ChannelType>(
  [getChannelByNameFactory('HOST')],
  channel => channel
);

const getHostChannel = createSelector<ChopStateType, void, string, string>(
  getChannelIdByNameFactory('HOST'),
  channel => channel
);

const getPublicChannelObject = createSelector<ChopStateType, void, ChannelType, ChannelType>(
  getChannelByNameFactory('PUBLIC'),
  channel => channel
);

const getPublicChannel = createSelector<ChopStateType, void, string, string>(
  getChannelIdByNameFactory('PUBLIC'),
  channel => channel
);

const channelFilter = (obj: ChannelsObjectType, predicate: (string, ChannelType) => boolean): { [string]: ChannelType } => {
  const result = {};
  Object.keys(obj).forEach(key => {
    if (obj.hasOwnProperty(key) && !predicate(key, obj[key])) {
      result[key] = obj[key];
    }
  });
  return result;
};

const getDirectChannels = createSelector<>(
  getChannels,
  channels =>
    channels ?
      channelFilter(channels, id => !channels[id].direct || channels[id].placeholder) :
      []
);

const getPlaceholderChannels = createSelector(
  getChannels,
  channels =>
    channels ?
      channelFilter(channels, id => !channels[id].placeholder) :
      []
);

const getLegacyChannel = createSelector(
  getChannelIdByNameFactory('LEGACY'),
  channel => channel ? channel : {
    name: 'Public',
    id: null,
    moments: [],
  }
);

const getCurrentChannel = createSelector(
  getPrimaryPane,
  pane => pane?.content?.channelId || '',
);

const getPublicChannelMessage = createSelector(
  getPublicChannelObject,
  channel => channel?.message || '',
);

const getCurrentTabType = createSelector(
  getPrimaryPane,
  pane => pane?.content?.type || '',
);

const feedAnchorMoments = createSelector(
  getChannelById,
  channel => channel && channel.anchorMoments ? channel.anchorMoments : []
);

const feedContents = createSelector(
  getChannelById,
  getCurrentLanguage,
  getMutedSubscribers,
  (channel, currentLanguage, mutedSubscribers) => channel && channel.moments ?
    channel.moments
      .map(translateMoment(currentLanguage))
      .filter(mutedMoment)
      .filter(removeMutedSubscribers(mutedSubscribers))
    : []
);

const hasNotSeenLatestMoments = createSelector(
  getChannelById,
  getSawLastMomentAt,
  (channel, sawLastMomentAt) => {
    if (channel && sawLastMomentAt !== undefined) {
      return channel.moments.some(moment => moment.timestamp > sawLastMomentAt) && channel.scrollPosition > 10;
    } else {
      return false;
    }
  }
);

const lastInArray = <I>(array: Array<I>): I => array[array.length - 1];

const isSameSubscriber = (subscriberA: SharedSubscriberType, subscriberB: SharedSubscriberType): boolean => subscriberA.id === subscriberB.id;

const getLastAction = (state: ChopStateType) => local(state).lastAction;

const getScroll = createSelector(
  [ getChannelById, getLastAction, getCurrentSubscriber ],
  (channel, action, currentSubscriber) => {
    if (!channel) {
      return {
        type: 'SCROLL_TO',
        position: 0,
      };
    }
    const { moments, scrollPosition } = channel;

    switch (action.type) {
      case 'PUBLISH_MOMENT_TO_CHANNEL': {
        const lastMessage = lastInArray(moments);
        if (lastMessage) {
          const messageSender = lastMessage.subscriber;
          // There is no subscriber for NOTIFICATION types
          if (messageSender && isSameSubscriber(messageSender, currentSubscriber)) {
            return {
              type: 'SCROLL_TO',
              position: 0,
            };
          }
        }
        return {
          type: 'NO_SCROLL',
        };
      }
      case 'LOAD_HISTORY':
        return {
          type: 'SCROLL_TO',
          position: 0,
        };
      case 'SET_CHAT_FOCUS':
        return {
          type: 'DELAY_SCROLL_TO',
          position: scrollPosition || 0,
        };
      case 'SET_ANCHOR_MOMENT':
      case 'SET_PANE_CONTENT':
        return {
          type: 'SCROLL_TO',
          position: scrollPosition || 0,
        };
      case 'RECEIVE_MOMENT': {
        if (scrollPosition < 10) {
          return {
            type: 'SCROLL_TO',
            position: 0,
          };
        } else {
          return {
            type: 'NO_SCROLL',
          };
        }
      }
      case 'CLEAR_CHANNEL_MESSAGE': {
        return {
          type: 'SCROLL_TO',
          position: 0,
        };
      }
      default:
        return {
          type: 'NO_SCROLL',
        };
    }
  }
);

export {
  getScroll,
  getHostChannel,
  getPublicChannel,
  getLegacyChannel,
  getDirectChannels,
  getPlaceholderChannels,
  getCurrentChannel,
  feedContents,
  feedAnchorMoments,
  getChannelById,
  getCurrentTabType,
  getHostChannelObject,
  getPublicChannelObject,
  hasNotSeenLatestMoments,
  getTranslateLanguage,
  getPublicChannelMessage,
};
