// @flow
const BASIC_AUTH_LOGIN = 'BASIC_AUTH_LOGIN';
const BASIC_AUTH_LOGIN_FAILED = 'BASIC_AUTH_LOGIN_FAILED';

type BasicAuthLoginType = {
  type: 'BASIC_AUTH_LOGIN',
  email: string,
  password: string,
};

const basicAuthLogin = (email: string, password: string): BasicAuthLoginType => (
  {
    type: BASIC_AUTH_LOGIN,
    email,
    password,
  }
);

export {
  BASIC_AUTH_LOGIN,
  BASIC_AUTH_LOGIN_FAILED,
  basicAuthLogin,
};

export type {
  BasicAuthLoginType,
};