import { createSelector } from 'reselect';

const getChannels = state => state.channels;

const getChannelById = (state, id) => getChannels(state)[id];

const getCurrentLanguage = state => state.currentLanguage;

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

const hasParticipants = createSelector(
  getChannelById,
  channel => channel && channel.participants && channel.participants.length ? true : false
);

const feedAnchorMoments = createSelector(
  getChannelById,
  channel => channel && channel.anchorMoments ? channel.anchorMoments : []
);

const feedContents = createSelector(
  getChannelById,
  getCurrentLanguage,
  (channel, currentLanguage) => channel && channel.moments ?
    channel.moments
      .map(translateMoment(currentLanguage))
      .filter(mutedMoment)
    : []
);

export {
  getHostChannel,
  getPublicChannel,
  getLegacyChannel,
  hasParticipants,
  feedContents,
  feedAnchorMoments,
  getChannelById,
};
