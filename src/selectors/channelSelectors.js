// @flow
import { createSelector } from 'reselect';
import { objectFilter } from '../util';
import type {
  FeedType,
  ChannelsObjectType,
  ChannelType,
  SharedUserType,
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

const getCurrentChannelObj = createSelector(
  [ getCurrentChannel, getChannels ],
  (channelId, channels) => channels[channelId]
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
    if (channel && sawLastMomentAt !== undefined) {
      return channel.moments.some(moment => moment.timestamp > sawLastMomentAt) && channel.scrollPosition > 10;
    } else {
      return false;
    }
  }
);

const getCurrentUser = (state: FeedType) => state.currentUser;

const lastInArray = <I>(array: Array<I>): I => array[array.length - 1];

const isSameUser = (userA: SharedUserType, userB: SharedUserType): boolean => userA.pubnubToken === userB.pubnubToken;

const getLastAction = (state: FeedType) => state.lastAction;

const getScroll = createSelector(
  [ getCurrentChannelObj, getLastAction, getCurrentUser ],
  (currentChannel, action, currentUser) => {
    if (!currentChannel) {
      return {
        type: 'SCROLL_TO',
        position: 0,
      };
    }
    const { moments, scrollPosition } = currentChannel;

    switch (action.type) {
    case 'PUBLISH_MOMENT_TO_CHANNEL': {
      const lastMessage = lastInArray(moments);
      if (lastMessage) {
        const messageSender = lastMessage.sender;
        if (isSameUser(messageSender, currentUser)) {
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
    case 'TOGGLE_CHAT_FOCUS':
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
  getCurrentChannel,
  feedContents,
  feedAnchorMoments,
  getChannelById,
  getMutedUsers,
  getHostChannelObject,
  getPublicChannelObject,
  hasNotSeenLatestMoments,
};
