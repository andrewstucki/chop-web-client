// @flow
import { createSelector } from 'reselect';

const getLanguages = state => state.languageOptions;

const getLanguageCount = createSelector(
  [getLanguages],
  languages => languages.length
);

export {
  getLanguageCount,
};
