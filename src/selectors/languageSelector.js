// @flow
import { createSelector } from 'reselect';
import type {FeedType, LanguageType} from '../feed/dux';

const getLanguages = state => state.languageOptions;

const getLanguageCount = createSelector<FeedType, void, number, Array<LanguageType>>(
  [getLanguages],
  languages => languages.length
);

export {
  getLanguageCount,
};
