// @flow
import type { LeaveChatType } from './leaveChat/dux';
import type { MuteSubscriberType } from './muteSubscriber/dux';
import type { ChatSetNicknameType } from './chatSetNickname/dux';
import type { LoginType } from './login/dux';
import type { ResetPasswordType } from './resetPassword/dux';
import type { ProfileSettingsType } from './profileSettings/dux';

// Action Types
const TOGGLE_POP_UP_MODAL = 'TOGGLE_POP_UP_MODAL';
const SET_POP_UP_MODAL = 'SET_POP_UP_MODAL';

// Flow Type Definitions
type TogglePopUpModalType = {
  type: typeof TOGGLE_POP_UP_MODAL,
  modal: PopUpModalType,
};

type SetPopUpModalType = {
  type: typeof SET_POP_UP_MODAL,
  modal: PopUpModalType,
};

type PopUpModalType =
  | LeaveChatType
  | MuteSubscriberType
  | ChatSetNicknameType
  | LoginType
  | ResetPasswordType
  | ProfileSettingsType
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
