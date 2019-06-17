// Action Types

export const GUEST_NICKNAME = 'GUEST_NICKNAME';

// Flow Type Definitions

export type GuestNicknameType = {
  type: GUEST_NICKNAME,
}

// Action Creators

export const guestNicknameType = (): GuestNicknameType => (
  {
    type: GUEST_NICKNAME,
  }
);