// @flow

// Action Types

const SET_LANGUAGE = 'SET_LANGUAGE';

// Type Definitions

type SetLanguageType = {
  type: 'SET_LANGUAGE',
  language: string,
};

// Action Creators

const setLanguage = (language: string): SetLanguageType => (
  {
    type: SET_LANGUAGE,
    language,
  }
);

// Exports

export type {
  SetLanguageType,
};

export {
  setLanguage,
};

export {
  SET_LANGUAGE,
};
