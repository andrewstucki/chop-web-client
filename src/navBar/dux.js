// @flow
import { 
  getCurrentChannel, 
  getPublicChannelObject as publicChannel, 
  getHostChannelObject as hostChannel, 
  getDirectChannels as directChannels,
} from '../selectors/channelSelectors';
import { createSelector } from 'reselect';

// Flow Type Definitions

type ChannelType = {
  name: string,
  id: string,
  isCurrent: boolean,
  hasActions: boolean,
  otherUsersNames: Array<string>,
};

// Selectors

const getOtherUserNames = (channel, currentUser) => {
  const { participants } = channel;
  if (participants && participants.length) {
    return participants
      .filter(user => user.pubnubToken !== currentUser.pubnubToken)
      .map(user => user.name);
  } else {
    return [];
  }
};

// eslint is dumb when it comes to optional chaining
const hasAction = channel => channel && channel.moments && channel.moments.filter ?
  channel.moments.filter(moment => ( // eslint-disable-line no-undef
    moment.type === 'ACTIONABLE_NOTIFICATION' &&
    moment.active === true)).length > 0
  : undefined;

const getCurrentUser = state => state.currentUser;

const createNavChannel = (channel, currentChannel, currentUser) => (
  {
    name: channel.name,
    id: channel.id,
    isCurrent: currentChannel === channel.id,
    hasActions: hasAction(channel),
    otherUsersNames: getOtherUserNames(channel, currentUser),
  }
);

const getPublicChannel = createSelector(
  state => publicChannel(state) || { name: 'Public', id: 'event', moments: [] },
  getCurrentChannel,
  getCurrentUser,
  createNavChannel
);

const getHostChannel = createSelector(
  state => hostChannel(state) || { name: 'Host', id: 'host', moments: [] },
  getCurrentChannel,
  getCurrentUser,
  createNavChannel
);

const getDirectChannels = createSelector(
  directChannels,
  getCurrentChannel,
  getCurrentUser,
  (channels, currentChannel, currentUser) => 
    Object.keys(channels).map(id => createNavChannel(channels[id], currentChannel, currentUser))
);

// Exports

export {
  getHostChannel,
  getPublicChannel,
  getDirectChannels,
};
export type {
  ChannelType,
};
