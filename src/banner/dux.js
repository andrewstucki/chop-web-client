// @flow
import type { TextModeType } from  '../textModeToggle/dux';
import { COMPACT } from '../textModeToggle/dux';

// Actions
export const SET_BANNER = 'SET_BANNER';
export const CLEAR_BANNER = 'CLEAR_BANNER';

// Types
// NOTE: Use the generic action creators, passing the key when possible. When specific styling needs to be done
// in the banner, we need to create more specific types (i.e. - MUTED and LOGGED_IN have the { name } bolded).
export const INFO = 'INFO';
export const WARNING = 'WARNING';
export const ERROR = 'ERROR';
export const MUTED = 'MUTED';
export const LOGGED_IN = 'LOGGED_IN';

export type BannerType = {
  type: typeof INFO | typeof WARNING | typeof ERROR | typeof MUTED | typeof LOGGED_IN,
  key: string,
  variables?: {
    [string]:string,
  },
};

export type SetBannerType = {
  type: typeof SET_BANNER,
  banner: BannerType,
};

export type ClearBannerType = {
  type: typeof CLEAR_BANNER,
};

// Action Creators
export const infoBanner = (key: string): SetBannerType => (
  {
    type: SET_BANNER,
    banner: {
      type: INFO,
      key,
    },
  }
);

export const warningBanner = (key: string): SetBannerType => (
  {
    type: SET_BANNER,
    banner: {
      type: WARNING,
      key,
    },
  }
);

export const errorBanner = (key: string): SetBannerType => (
  {
    type: SET_BANNER,
    banner: {
      type: ERROR,
      key,
    },
  }
);

export const mutedBanner = (name: string): SetBannerType => (
  {
    type: SET_BANNER,
    banner: {
      type: MUTED,
      key: 'subscriber_muted',
      variables: {
        name,
      },
    },
  }
);

export const textModeBanner = (mode: TextModeType): SetBannerType => (
  {
    type: SET_BANNER,
    banner: {
      type: INFO,
      key: 'text_mode_updated',
      variables: {
        mode: mode === COMPACT ? 'decreased' : 'increased',
      },
    },
  }
);

export const loggedInBanner = (): SetBannerType => (
  {
    type: SET_BANNER,
    banner: {
      type: LOGGED_IN,
      key: 'logged_in',
    },
  }
);

export const passwordResetBanner = (): SetBannerType => (
  {
    type: SET_BANNER,
    banner: {
      type: INFO,
      key: 'password_reset',
    },
  }
);

export const loggedOutBanner = (): SetBannerType => (
  {
    type: SET_BANNER,
    banner: {
      type: INFO,
      key: 'logged_out',
    },
  }
);

export const clearBanner = (): ClearBannerType => (
  {
    type: CLEAR_BANNER,
  }
);
