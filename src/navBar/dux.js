// @flow
import type { FeedType } from '../feed/dux';

// Flow Type Definitions

type ChannelType = {
  id: string,
  isCurrent: boolean,
  hasActions: boolean,
};

type ChannelsListType = Array<ChannelType>;

// Selectors

const getChannels = (state: FeedType): ChannelsListType => (
  Object.keys(state.channels).map(id => ({
    id,
    isCurrent: state.currentChannel === id,
    hasActions: state.channels[id].filter(moment => (
      moment.type === 'ACTIONABLE_NOTIFICATION' && moment.active === true
    )).length > 0,
  }))
);

// Exports

export {
  getChannels,
};
export type {
  ChannelType,
};
