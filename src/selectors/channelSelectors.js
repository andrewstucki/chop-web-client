import { createSelector } from 'reselect';

const getChannels = state => state.channels;

const getChannelByNameFactory = name => (
  createSelector(
    getChannels,
    channels => Object.keys(channels).find(channel => channels[channel].name.toUpperCase() === name)
  )
);

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

export {
  getHostChannel,
  getPublicChannel,
  getLegacyChannel,
};