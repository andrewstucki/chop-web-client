import { createSelector } from 'reselect';
import { getChannelById } from './channelSelectors';
import { getCurrentUser } from '../users/dux';

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

const getOtherUsers = createSelector(
  getChannelById,
  getCurrentUser,
  (channel, currentUser) => channel && channel.participants ?
    channel.participants
      .filter(participant => participant.pubnubToken !== currentUser.pubnubToken)
    : []
);

const hasOtherUsers = createSelector(
  getOtherUsers,
  users => users.length > 0
);

const getOtherUsersNames = createSelector(
  getOtherUsers,
  users => users.map(participant => participant.name)
);

const getPlaceholder = createSelector(
  getChannelType,
  getOtherUsersNames,
  (channelType, otherUserNames) => {
    switch (channelType) {
      case HOST:
        return 'Chat with hosts';
      case DIRECT:
        return `Chat with ${otherUserNames.join(', ').replace(/,\s([^,]*)$/, ' and $1')}`;
      case PUBLIC:
      default:
        return 'Chat';
    }
  }
);

export {
  getPlaceholder,
  getOtherUsers,
  hasOtherUsers,
  getCurrentUser,
};
