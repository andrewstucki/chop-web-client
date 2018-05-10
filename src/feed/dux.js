// @flow
import type {MessageType} from '../chat/dux';

// Action Types
const CHANGE_CHANNEL = 'CHANGE_CHANNEL';

// Flow Type Definitions
type MomentType =
  | MessageType

type FeedType = {
  channels: {
    [string]: Array<MomentType>
  },
  currentChannel: string
}

type ChangeChannelType = {
  type: 'CHANGE_CHANNEL',
  channel: string
}

type FeedActionTypes =
  | ChangeChannelType

// Action Creators

const changeChannel = (newChannel: string): ChangeChannelType => (
  {
    type: CHANGE_CHANNEL,
    channel: newChannel,
  }
)

// Default State

const defaultState = {
  channels: {
    default: []
  },
  currentChannel: 'default'
}

// Reducer

const reducer =
(
  state: FeedType = defaultState,
  action?: FeedActionTypes): FeedType => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
    case CHANGE_CHANNEL:
      return {
        ...state,
        currentChannel: action.channel
      }
    default:
      return state;
  }
}

// Exports

export {
  CHANGE_CHANNEL,
}
export {
  changeChannel,
}
export type {
  MomentType,
};

export default reducer;