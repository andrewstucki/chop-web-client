// Action Types

const TOGGLE_POP_UP_MODAL = 'TOGGLE_POP_UP_MODAL';
const LEAVE_CHAT = 'LEAVE_CHAT';
const MUTE_SUBSCRIBER = 'MUTE_SUBSCRIBER';

// Flow Type Definitions

type TogglePopUpModalType = {
  type: 'TOGGLE_POP_UP_MODAL',
  modal: PopUpModalType,
};

type LeaveChatType = {
  type: LEAVE_CHAT,
};

type MuteSubscriberType = {
  type: MUTE_SUBSCRIBER,
  subscriber: string,
  channelId: string,
};

type PopUpModalType =
  | LeaveChatType
  | MuteSubscriberType
  | {};

// Action Creators

const muteSubscriberType = (
  subscriber: string,
  channelId: string,
): MuteSubscriberType => (
  {
    type: MUTE_SUBSCRIBER,
    subscriber,
    channelId,
  }
);

const leaveChatType = (): LeaveChatType => (
  {
    type: LEAVE_CHAT,
  }
);

const togglePopUpModal = (
  modal: PopUpModalType = {}
): TogglePopUpModalType => (
  {
    type: TOGGLE_POP_UP_MODAL,
    modal,
  }
);


// Exports

export type {
  TogglePopUpModalType,
  PopUpModalType,
  LeaveChatType,
  MuteSubscriberType,
};

export {
  TOGGLE_POP_UP_MODAL,
  LEAVE_CHAT,
  MUTE_SUBSCRIBER,
};

export {
  togglePopUpModal,
  leaveChatType,
  muteSubscriberType,
};
