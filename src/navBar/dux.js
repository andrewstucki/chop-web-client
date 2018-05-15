// @flow
import type { ChangeChannelType } from '../feed/dux';
import { CHANGE_CHANNEL } from '../feed/dux';

// Flow Type Definitions

type NavBarType = {
  channels: [
    string,
    string,
  ],
  currentChannel: string,
};

type NavBarActionTypes =
  | ChangeChannelType;

// Default State

const defaultState = {
  channels: [
    'Default',
    'Host',
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

// Exports

export default reducer;
