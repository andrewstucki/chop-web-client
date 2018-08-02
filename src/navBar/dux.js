// @flow
import type { FeedType, UserType } from '../feed/dux';

// Flow Type Definitions

type ChannelType = {
  id: string,
  isCurrent: boolean,
  hasActions: boolean,
  directChatParticipants?: Array<UserType>,
};

type ChannelsListType = Array<ChannelType>;

// Selectors

const getChannels = (state: FeedType): ChannelsListType => (
  Object.keys(state.channels).filter(
    id => id !== 'request' && id !== 'command'
  ).map(id => {
    const { participants, moments } = state.channels[id];

    const getOtherUsers = () => {
      if (participants &&
        participants.length > 1
      ) {
        const otherUsers = participants.filter(participant => 
          participant.id !== state.currentUser.id
        );
        return otherUsers;
      } else if (participants && participants.length === 1) {
        return participants;
      }
    };

    return {
      id,
      isCurrent: state.currentChannel === id,
      hasActions: moments.filter(moment => (
        moment.type === 'ACTIONABLE_NOTIFICATION' && moment.active === true
      )).length > 0,
      directChatParticipants: getOtherUsers(),
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
