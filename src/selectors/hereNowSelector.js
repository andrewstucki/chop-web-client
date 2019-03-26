import { createSelector } from 'reselect';
import { getPublicChannel } from './channelSelectors';

const getHereNow = state => state.hereNow;

const getUsersInChannel = (state, channel:string) => (
  getHereNow(state)?.[channel] || []
);

const getUserCountInChannel = createSelector(
  [getUsersInChannel],
  users => users.length
);

const getAvailableForPrayer = createSelector(
  getPublicChannel,
  getHereNow,
  (publicChannel, hereNow) => hereNow[publicChannel].filter(user => user.state.available_prayer).map(user => user.id)
);

export {
  getUserCountInChannel,
  getAvailableForPrayer,
};

