// Action Types

export const LEAVE_CHAT = 'LEAVE_CHAT';

// Flow Type Definitions

export type LeaveChatType = {
  type: LEAVE_CHAT,
};

// Action Creators

export const leaveChatType = (): LeaveChatType => (
  {
    type: LEAVE_CHAT,
  }
);