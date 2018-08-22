// @flow

// Action Types

const TOGGLE_LANGUAGE_SELECTOR = 'TOGGLE_LANGUAGE_SELECTOR';

// Type Definitions

type ToggleLanguageSelectorType = {
  type: 'TOGGLE_LANGUAGE_SELECTOR',
};

// Action Creators

const toggleLanguageSelector = (): ToggleLanguageSelectorType => (
  {
    type: TOGGLE_LANGUAGE_SELECTOR,
  }
);

// Exports

export type {
  ToggleLanguageSelectorType,
};

export {
  toggleLanguageSelector,
};

export {
  TOGGLE_LANGUAGE_SELECTOR,
};