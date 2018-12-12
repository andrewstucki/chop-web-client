import { createSelector } from 'reselect';

const getChannels = state => state.channels;

const getChannelById = (state, id) => getChannels(state)[id];

const getCurrentLanguage = state => state.currentLanguage;

const getPrimaryPane = state => state.panes.primary;

const getMutedUsers = state => state.mutedUsers;

const getChannelByNameFactory = name => (
  createSelector(
    getChannels,
    channels => { 
      if (channels !== null) {
        return Object.keys(channels).find(channel => channels[channel].name.toUpperCase() === name);
      }
    }
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

const getHostChannel = createSelector(
  getChannelByNameFactory('HOST'),
  channel => channel
);

const getPublicChannel = createSelector(
  getChannelByNameFactory('PUBLIC'),
  channel => channel
);

const getLegacyChannel = createSelector(
  getChannelByNameFactory('LEGACY'),
  channel => channel
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
  getCurrentChannel,
  hasParticipants,
  feedContents,
  feedAnchorMoments,
  getChannelById,
  getMutedUsers,
};
