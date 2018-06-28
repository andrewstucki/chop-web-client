// @flow

// Type Definitions

const LEAVE_DIRECT_CHAT = 'LEAVE_DIRECT_CHAT';
const CANCEL_DIRECT_CHAT = 'CANCEL_DIRECT_CHAT';

type FeedActionBannerType = 
 | LeaveDirectChatType
 | CancelDirectChatType;

type LeaveDirectChatType = {
  type: 'LEAVE_DIRECT_CHAT',
  channel: string,
};

type CancelDirectChatType = {
  type: 'CANCEL_DIRECT_CHAT',
  channel: string,
};

// Action Creators

// Exports

export type {
  LeaveDirectChatType,
  CancelDirectChatType,
  FeedActionBannerType,
};

export {
  LEAVE_DIRECT_CHAT,
  CANCEL_DIRECT_CHAT,
};
