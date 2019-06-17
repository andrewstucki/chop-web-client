// Action Types

export const LOGIN = 'LOGIN';

// Flow Type Definitions

export type LoginType = {
  type: LOGIN,
  error: boolean,
}

// Action Creators

export const loginType = (): LoginType => (
  {
    type: LOGIN,
    error: false,
  }
);