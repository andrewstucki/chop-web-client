// @flow
import type { FeedType } from '../feed/dux';

// Flow Type Definitions

type ChannelType = {
  id: string,
  isCurrent: boolean,
  hasActions: boolean,
  directChatParticipant?: string,
};

type ChannelsListType = Array<ChannelType>;

// Selectors

const getChannels = (state: FeedType): ChannelsListType => (
  Object.keys(state.channels).filter(
    id => id !== 'request' && id !== 'command'
  ).map(id => {
    const { participants, moments } = state.channels[id];
    const otherUserNickname = () => {
      if (participants) {
        return participants[0].id !== state.currentUser.id ?
          participants[0].nickname : participants[1].nickname;
      }
    };

    return {
      id,
      isCurrent: state.currentChannel === id,
      hasActions: moments.filter(moment => (
        moment.type === 'ACTIONABLE_NOTIFICATION' && moment.active === true
      )).length > 0,
      directChatParticipant: otherUserNickname(),
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
