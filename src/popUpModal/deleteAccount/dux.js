// @flow

// Action Types
export const DELETE_ACCOUNT = 'DELETE_ACCOUNT';

// Flow Type Definitions
export type DeleteAccountType = {
  type: typeof DELETE_ACCOUNT,
};

// Action Creators

export const deleteAccountType = (): DeleteAccountType => (
  {
    type: DELETE_ACCOUNT,
  }
);
