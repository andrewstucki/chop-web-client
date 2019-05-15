// @flow
import { createSelector } from 'reselect';
import type {LanguageType} from '../feed/dux';
import type { ChopStateType } from '../chop/dux';

const ID = 'feed';

const local = state => state[ID] || state;

const getLanguages = state => local(state).languageOptions;

const getLanguageCount = createSelector<ChopStateType, void, number, Array<LanguageType>>(
  [getLanguages],
  languages => languages.length
);

export {
  getLanguageCount,
};
