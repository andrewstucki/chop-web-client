// @flow

// Action Types

const TOGGLE_LANGUAGE_SELECTOR = 'TOGGLE_LANGUAGE_SELECTOR';
const SET_LANGUAGE = 'SET_LANGUAGE';

// Type Definitions

type ToggleLanguageSelectorType = {
  type: 'TOGGLE_LANGUAGE_SELECTOR',
};

type SetLanguageType = {
  type: 'SET_LANGUAGE',
  language: string,
};

// Action Creators

const toggleLanguageSelector = (): ToggleLanguageSelectorType => (
  {
    type: TOGGLE_LANGUAGE_SELECTOR,
  }
);

const setLanguage = (language: string): SetLanguageType => (
  {
    type: SET_LANGUAGE,
    language,
  }
);

// Exports

export type {
  ToggleLanguageSelectorType,
  SetLanguageType,
};

export {
  toggleLanguageSelector,
  setLanguage,
};

export {
  TOGGLE_LANGUAGE_SELECTOR,
  SET_LANGUAGE,
};