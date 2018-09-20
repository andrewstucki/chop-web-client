// @flow
import type { FeedType } from '../feed/dux';

// Flow Type Definitions

type ChannelType = {
  name: string,
  id: string,
  isCurrent: boolean,
  hasActions: boolean,
  otherUsersNames: Array<string>,
};

type ChannelsListType = Array<ChannelType>;

// Selectors

const getChannels = (state: FeedType): ChannelsListType => (
  Object.keys(state.channels).filter(
    id => state.channels[id].name !== 'Legacy' && state.channels[id].name !== 'Personal'
  ).map(id => {
    const { participants, moments, name } = state.channels[id];

    const getOtherUserNames = () => {
      if (participants && participants.length) {
        return participants.filter(user => user.pubnubToken !== state.currentUser.pubnubToken)
          .map(user => user.name);
      } else {
        return [];
      }
    };

    return {
      name,
      id,
      isCurrent: state.currentChannel === id,
      hasActions: moments.filter(moment => (
        moment.type === 'ACTIONABLE_NOTIFICATION' && moment.active === true
      )).length > 0,
      otherUsersNames: getOtherUserNames(),
    };
  })
);

// Exports

export {
  getChannels,
};
export type {
  ChannelType,
};
