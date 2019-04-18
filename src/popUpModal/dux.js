// Action Types

const TOGGLE_POP_UP_MODAL = 'TOGGLE_POP_UP_MODAL';
const LEAVE_CHAT = 'LEAVE_CHAT';
const MUTE_USER = 'MUTE_USER';

// Flow Type Definitions

type TogglePopUpModalType = {
  type: 'TOGGLE_POP_UP_MODAL',
  modal: PopUpModalType,
};

type LeaveChatType = {
  type: LEAVE_CHAT,
}

type MuteUserType = {
  type: MUTE_USER,
  user: string,
}

type PopUpModalType =
  | LeaveChatType
  | MuteUserType
  | {};

// Action Creators

const muteUserType = (
  user: string
): MuteUserType => (
  {
    type: MUTE_USER,
    user,
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
  MuteUserType,
};

export {
  TOGGLE_POP_UP_MODAL,
  LEAVE_CHAT,
  MUTE_USER,
};

export {
  togglePopUpModal,
  leaveChatType,
  muteUserType,
};