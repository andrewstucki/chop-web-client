// @flow
import type { TextModeType } from  '../textModeToggle/dux';

const MUTED = 'MUTED';
const ERROR = 'ERROR';
const WARNING = 'WARNING';
const TEXT_MODE = 'TEXT_MODE';
const LOGGED_IN = 'LOGGED_IN';
const PASSWORD_RESET = 'PASSWORD_RESET';
const LOGGED_OUT = 'LOGGED_OUT';
const SET_BANNER = 'SET_BANNER';
const CLEAR_BANNER = 'CLEAR_BANNER';

// Flow Type Definitions

type MutedBannerType = {
  type: typeof MUTED,
  name: string,
};

type ErrorBannerType = {
  type: typeof ERROR,
  error: string,
};

type WarningBannerType = {
  type: typeof WARNING,
  warning: string,
};

type TextModeBannerType = {
  type: typeof TEXT_MODE,
  mode: TextModeType,
};

type LoggedInBannerType = {
  type: typeof LOGGED_IN,
};

type PasswordResetBannerType = {
  type: typeof PASSWORD_RESET,
};

type LoggedOutBannerType = {
  type: typeof LOGGED_OUT,
};

type SetBannerType = {
  type: typeof SET_BANNER,
  banner: BannerType,
};

type ClearBannerType = {
  type: typeof CLEAR_BANNER,
};

type BannerType = 
  | MutedBannerType
  | ErrorBannerType
  | WarningBannerType
  | TextModeBannerType
  | LoggedInBannerType
  | PasswordResetBannerType
  | LoggedOutBannerType
  | {};
  

// Action Creators

const mutedBanner = (
  name: string,
): SetBannerType => (
  {
    type: SET_BANNER,
    banner: {
      type: MUTED,
      name,
    },
  }
);

const warningBanner = (
  warning: string,
): SetBannerType => (
  {
    type: SET_BANNER,
    banner: {
      type: WARNING,
      warning,
    },
  }
);

const errorBanner = (
  error: string,
): SetBannerType => (
  {
    type: SET_BANNER,
    banner: {
      type: ERROR,
      error,
    },
  }
);

const textModeBanner = (
  mode: TextModeType,
): SetBannerType => (
  {
    type: SET_BANNER,
    banner: {
      type: TEXT_MODE,
      mode,
    },
  }
);

const loggedInBanner = (): SetBannerType => (
  {
    type: SET_BANNER,
    banner: {
      type: LOGGED_IN,
    },
  }
);

const passwordResetBanner = (): SetBannerType => (
  {
    type: SET_BANNER,
    banner: {
      type: PASSWORD_RESET,
    },
  }
);

const loggedOutBanner = (): SetBannerType => (
  {
    type: SET_BANNER,
    banner: {
      type: LOGGED_OUT,
    },
  }
);

const clearBanner = (): ClearBannerType => (
  {
    type: CLEAR_BANNER,
  }
);

// Exports

export {
  mutedBanner,
  errorBanner,
  warningBanner,
  textModeBanner,
  loggedInBanner,
  passwordResetBanner,
  loggedOutBanner,
  clearBanner,
};

export type {
  BannerType,
  SetBannerType,
};

export {
  MUTED,
  WARNING,
  ERROR,
  TEXT_MODE,
  LOGGED_IN,
  PASSWORD_RESET,
  LOGGED_OUT,
  SET_BANNER,
  CLEAR_BANNER,
};