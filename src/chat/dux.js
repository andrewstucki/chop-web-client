// @flow
import type { FeedType } from '../feed/dux';

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
  const currentChannelObj = state.channels[state.currentChannel];
  let otherUserName = [];
  if (state.currentChannel === 'host') {
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
