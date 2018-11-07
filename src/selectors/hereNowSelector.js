import { createSelector } from 'reselect';
import { getPublicChannel } from './channelSelectors';

const getHereNowSelector = state => state.hereNow;

const getUserInPublicChannel = createSelector(
  getHereNowSelector,
  getPublicChannel,
  (hereNow, publicChannel) => {
    const channel = hereNow[publicChannel];
    const userIds = Object.keys(channel);
    const getUser = id => (
      {
        id,
        available_prayer: channel[id].available_prayer, // eslint-disable-line camelcase
      }
    );

    return userIds.map(getUser);
  }
);

const getAvailableForPrayer = createSelector(
  getUserInPublicChannel,
  users => users.filter(user => user.available_prayer)
);



export {
  getAvailableForPrayer,
};

