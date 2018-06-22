// @flow
import type { ChangeChannelType, FeedType } from '../feed/dux';
import { CHANGE_CHANNEL } from '../feed/dux';

// Flow Type Definitions

type NavBarType = {
  channels: Array<string>,
  currentChannel: string,
};

type NavBarActionTypes =
  | ChangeChannelType;

type ChannelType = {
  id: string,
  isCurrent: boolean,
  hasActions: boolean,
};

type ChannelsListType = Array<ChannelType>;

// Default State

const defaultState = {
  channels: [
    'public',
    'host',
  ],
  currentChannel: 'public',
};

// Reducer

const reducer = (
  state: NavBarType = defaultState,
  action?: NavBarActionTypes): NavBarType => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
  case CHANGE_CHANNEL:
    return {
      ...state,
      currentChannel: action.channel,
    };
  default:
    return state;
  }
};

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

export default reducer;
