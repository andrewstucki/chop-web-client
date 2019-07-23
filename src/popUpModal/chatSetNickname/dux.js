
// Action Types

export const CHAT_SET_NICKNAME = 'CHAT_SET_NICKNAME';

// Flow Type Definitions

export type ChatSetNicknameType = {
  type: CHAT_SET_NICKNAME,
}

// Action Creators

export const chatSetNicknameType = (): ChatSetNicknameType => (
  {
    type: CHAT_SET_NICKNAME,
  }
);
