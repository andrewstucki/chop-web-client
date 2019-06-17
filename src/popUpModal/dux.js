import { LeaveChatType } from './leaveChat/dux';
import { MuteSubscriberType } from './muteSubscriber/dux';
import { GuestNicknameType } from './guestNickname/dux';
import { LoginType } from './login/dux';
import { ResetPasswordType } from './resetPassword/dux';

// Action Types

const TOGGLE_POP_UP_MODAL = 'TOGGLE_POP_UP_MODAL';
const SET_POP_UP_MODAL = 'SET_POP_UP_MODAL';

// Flow Type Definitions

type TogglePopUpModalType = {
  type: TOGGLE_POP_UP_MODAL,
  modal: PopUpModalType,
};

type SetPopUpModalType = {
  type: SET_POP_UP_MODAL,
  modal: PopUpModalType,
};

type PopUpModalType =
  | LeaveChatType
  | MuteSubscriberType
  | GuestNicknameType
  | LoginType
  | ResetPasswordType
  | {};

// Action Creators

const togglePopUpModal = (
  modal: PopUpModalType = {}
): TogglePopUpModalType => (
  {
    type: TOGGLE_POP_UP_MODAL,
    modal,
  }
);

const setPopUpModal = (
  modal: PopUpModalType = {}
): SetPopUpModalType => (
  {
    type: SET_POP_UP_MODAL,
    modal,
  }
);

// Exports

export type {
  TogglePopUpModalType,
  SetPopUpModalType,
  PopUpModalType,
};

export {
  TOGGLE_POP_UP_MODAL,
  SET_POP_UP_MODAL,
};

export {
  togglePopUpModal,
  setPopUpModal,
};
