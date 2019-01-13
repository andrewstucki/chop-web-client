// @flow
import { createSelector } from 'reselect';
import { objectFilter } from '../util';
import type {
  FeedType,
  ChannelsObjectType,
  ChannelType,
} from '../feed/dux';
import type {
  ChannelIdType,
  LanguageCodeType,
  UIDType,
} from '../cwc-types';
import type { PaneContentType } from '../pane/dux';
import type { MomentType } from '../moment';

const getChannels = (state: FeedType): ChannelsObjectType => state.channels;

const getChannelById = (state: FeedType, id: ChannelIdType): ChannelType => getChannels(state)[id];

const getCurrentLanguage = (state: FeedType): LanguageCodeType => state.currentLanguage;

const getPrimaryPane = (state: FeedType): PaneContentType => state.panes.primary;

const getMutedUsers = (state: FeedType):Array<UIDType>  => state.mutedUsers;

const getSawLastMomentAt = createSelector(
  getChannelById,
  channel => channel ? channel.sawLastMomentAt : 0
);

const getChannelIdByNameFactory = (name: string): ChannelIdType => (
  createSelector(
    getChannels,
    channels => { 
      if (channels) {
        return Object.keys(channels).find(channel => channels[channel] ? channels[channel].name.toUpperCase() === name : null);
      }
    }
  )
);

const getChannelByNameFactory = (name: string): ChannelType => (
  createSelector(
    getChannels,
    getChannelIdByNameFactory(name),
    (channels, id) => channels[id]
  )
);

const translateMoment = (currentLanguage: LanguageCodeType) => (moment: MomentType): MomentType => {
  if (moment.type === 'MESSAGE' &&
      moment.lang !== currentLanguage &&
      moment.translations) {
    const translation = moment.translations.find(translation => translation.languageCode === currentLanguage);
    if (translation && translation.text) {
      return {
        ...moment,
        text: translation.text,
      };
    }
  }
  return moment;
};

const mutedMoment = (moment: MomentType): boolean => moment.isMuted !== 'true';

const removeMutedUsers = (mutedUsers: Array<UIDType>) => (moment: MomentType): boolean => {
  if (moment.user) {
    return !mutedUsers.includes(moment.user.name);
  } else {
    return true;
  }
};

const getHostChannelObject = createSelector(
  getChannelByNameFactory('HOST'),
  channel => channel
);

const getHostChannel = createSelector(
  getChannelIdByNameFactory('HOST'),
  channel => channel
);

const getPublicChannelObject = createSelector(
  getChannelByNameFactory('PUBLIC'),
  channel => channel
);

const getPublicChannel = createSelector(
  getChannelIdByNameFactory('PUBLIC'),
  channel => channel
);

const getDirectChannels = createSelector(
  getChannels,
  channels =>
    channels ?
      objectFilter(channels, id => !channels[id].direct) :
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
  pane => pane.channelId,
);

const feedAnchorMoments = createSelector(
  getChannelById,
  channel => channel && channel.anchorMoments ? channel.anchorMoments : []
);

const feedContents = createSelector(
  getChannelById,
  getCurrentLanguage,
  getMutedUsers,
  (channel, currentLanguage, mutedUsers) => channel && channel.moments ?
    channel.moments
      .map(translateMoment(currentLanguage))
      .filter(mutedMoment)
      .filter(removeMutedUsers(mutedUsers))
    : []
);

const hasNotSeenLatestMoments = createSelector(
  getChannelById,
  getSawLastMomentAt,
  (channel, sawLastMomentAt) => {
    if (channel) {
      return channel.moments.filter(moment => moment.timestamp > sawLastMomentAt).length > 0;
    } else {
      return false;
    }
  }
);

export {
  getHostChannel,
  getPublicChannel,
  getLegacyChannel,
  getDirectChannels,
  getCurrentChannel,
  feedContents,
  feedAnchorMoments,
  getChannelById,
  getMutedUsers,
  getHostChannelObject,
  getPublicChannelObject,
  hasNotSeenLatestMoments,
};
