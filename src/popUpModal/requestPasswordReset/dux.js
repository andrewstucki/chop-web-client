// @flow
export const REQUEST_PASSWORD_RESET = 'REQUEST_PASSWORD_RESET';

// Flow Type Definitions

export type RequestPasswordResetType = {
  type: typeof REQUEST_PASSWORD_RESET,
};

// Action Creators

export const requestPasswordReset = (): RequestPasswordResetType => (
  {
    type: REQUEST_PASSWORD_RESET,
  }
);
