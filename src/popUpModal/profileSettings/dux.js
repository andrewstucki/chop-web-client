// @flow
// Action Types
export const PROFILE_SETTINGS = 'PROFILE_SETTINGS';

// Flow Type Definitions
export type ProfileSettingsType = {
  type: typeof PROFILE_SETTINGS,
};

// Action Creators
export const profileSettingsType = ():ProfileSettingsType => (
  {
    type: PROFILE_SETTINGS,
  }
);
