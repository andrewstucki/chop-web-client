// @flow
import type { FeedType } from '../feed/dux';
import { getHostChannel } from '../selectors/channelSelectors';
import { paneContentSelector } from '../selectors/paneSelectors';
import { PRIMARY_PANE } from '../pane/dux';

// Action Types

const TOGGLE_CHAT_FOCUS = 'TOGGLE_CHAT_FOCUS';

// Flow Type Definitions

type ToggleChatFocusType = {
  type: 'TOGGLE_CHAT_FOCUS',
  focus: boolean
};

// Action Creators

const toggleChatFocus = (focus: boolean): ToggleChatFocusType => (
  {
    type: TOGGLE_CHAT_FOCUS,
    focus,
  }
);

// Selectors

const getPlaceholder = (state: FeedType) => {
  const primaryPane = paneContentSelector(state, PRIMARY_PANE);
  const { channelId:currentChannel } = primaryPane;
  const currentChannelObj = state.channels[currentChannel];

  const hostChannel = getHostChannel(state);
  let otherUserName = [];
  if (currentChannel === hostChannel) {
    return 'Chat with hosts';
  } else if (currentChannelObj &&
    currentChannelObj.participants &&
    currentChannelObj.participants.length === 2
  ) {
    const [ getOtherUser ] = currentChannelObj.participants.filter(participant =>
      participant.pubnubToken !== state.currentUser.pubnubToken
    );
    otherUserName.push(getOtherUser.name);
    return `Chat with ${otherUserName[0]}`;
  } else {
    otherUserName = [];
    return 'Chat';
  }
};

// Exports

export {
  TOGGLE_CHAT_FOCUS,
};

export type {
  ToggleChatFocusType,
};

export {
  toggleChatFocus,
  getPlaceholder,
};
