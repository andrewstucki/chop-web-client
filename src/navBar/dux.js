// @flow
import type { ChangeChannelType } from '../feed/dux';
import { CHANGE_CHANNEL } from '../feed/dux';

// Flow Type Definitions

type NavBarType = {
  channels: Array<string>,
  currentChannel: string,
};

type NavBarActionTypes =
  | ChangeChannelType;

type ChannelType = {
  channel: string,
  isCurrent: boolean,
};

type ChannelsListType = Array<ChannelType>;

// Default State

const defaultState = {
  channels: [
    'default',
    'host',
  ],
  currentChannel: 'default',
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

const getChannels = (state: NavBarType): ChannelsListType => (
  state.channels.map(channel => ({
    channel,
    isCurrent: state.currentChannel === channel,
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
