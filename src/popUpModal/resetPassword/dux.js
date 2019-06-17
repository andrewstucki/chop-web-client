// Action Types

export const RESET_PASSWORD = 'RESET_PASSWORD';

// Flow Type Definitions

export type ResetPasswordType = {
  type: RESET_PASSWORD,
  resetToken: string,
};

// Action Creators

export const resetPassword = (
  resetToken: string,
): ResetPasswordType => (
  {
    type: RESET_PASSWORD,
    resetToken,
  }
);