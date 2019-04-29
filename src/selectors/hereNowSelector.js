// @flow
import { createSelector } from 'reselect';
import { getPublicChannel } from './channelSelectors';
import type {FeedType, HereNowChannels, UserState} from '../feed/dux';

const getHereNow = (state: FeedType): HereNowChannels => state.hereNow;

const getUsersInChannel = (state: FeedType, channel:string): Array<UserState> => (
  getHereNow(state)[channel] || []
);

const getUserCountInChannel = createSelector<FeedType, string, number, Array<UserState>>(
  [getUsersInChannel],
  users => users.length
);

const getAvailableForPrayer = createSelector<FeedType, void, Array<string>, string, HereNowChannels>(
  getPublicChannel,
  getHereNow,
  (publicChannel, hereNow) => hereNow[publicChannel].filter(user => user.state.available_prayer).map(user => user.id)

);

export {
  getUserCountInChannel,
  getAvailableForPrayer,
};

