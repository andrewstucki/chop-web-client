// @flow
import type { FeedType } from '../feed/dux';

// Flow Type Definitions

type ChannelType = {
  id: string,
  isCurrent: boolean,
  hasActions: boolean,
  otherUsersNames: Array<string>,
};

type ChannelsListType = Array<ChannelType>;

// Selectors

const getChannels = (state: FeedType): ChannelsListType => (
  Object.keys(state.channels).filter(
    id => id !== 'request' && id !== 'command'
  ).map(id => {
    const { participants, moments } = state.channels[id];

    const getOtherUserNames = () => {
      if (participants && participants.length) {
        return participants.filter(user => user.pubnubToken !== state.currentUser.pubnubToken)
          .map(user => user.name);
      } else {
        return [];
      }
    };

    return {
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
