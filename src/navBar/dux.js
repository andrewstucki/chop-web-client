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
  Object.keys(state.channels).filter(id => id !== 'request' && id !== 'command').map(id => ({
    id,
    isCurrent: state.currentChannel === id,
    hasActions: state.channels[id].moments.filter(moment => (
      moment.type === 'ACTIONABLE_NOTIFICATION' && moment.active === true
    )).length > 0,
    directChatParticipant: state.channels[id].participants && state.channels[id].participants[0].nickname ?
      state.channels[id].participants[0].nickname :
      undefined,
  }))
);

// Exports

export {
  getChannels,
};
export type {
  ChannelType,
};
