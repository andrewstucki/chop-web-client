import { createSelector } from 'reselect';
import { objectFilter } from '../util';

const getChannels = state => state.channels;

const getChannelById = (state, id) => getChannels(state)[id];

const getCurrentLanguage = state => state.currentLanguage;

const getPrimaryPane = state => state.panes.primary;

const getMutedUsers = state => state.mutedUsers;

const getChannelIdByNameFactory = name => (
  createSelector(
    getChannels,
    channels => { 
      if (channels !== null) {
        return Object.keys(channels).find(channel => channels[channel].name.toUpperCase() === name);
      }
    }
  )
);

const getChannelByNameFactory = name => (
  createSelector(
    getChannels,
    getChannelIdByNameFactory(name),
    (channels, id) => channels[id]
  )
);

const translateMoment = currentLanguage => moment => {
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

const mutedMoment = moment => moment.isMuted !== 'true';

const removeMutedUsers = mutedUsers => moment => {
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
      objectFilter(channels, id => !channels[id].participants || channels[id].participants.length === 0) :
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

const hasParticipants = createSelector(
  getChannelById,
  channel => !!(channel && channel.participants && channel.participants.length)
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

export {
  getHostChannel,
  getPublicChannel,
  getLegacyChannel,
  getDirectChannels,
  getCurrentChannel,
  hasParticipants,
  feedContents,
  feedAnchorMoments,
  getChannelById,
  getMutedUsers,
  getHostChannelObject,
  getPublicChannelObject,
};
