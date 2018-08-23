// @flow
import React from 'react';

import type { LanguageType } from '../feed/dux';
import styles from './style.css';

type LanguageSelectorPropsType = {
  setLanguage: (language: string) => void,
  languageOptions: Array<LanguageType>,
};

const LanguageSelector = (
  {
    setLanguage,
    languageOptions,
  }: LanguageSelectorPropsType
) => (
  <div className={styles.container}>
    <div className={styles.text}>
      Chat translation:
    </div>
    <div className={styles.dropdownContainer}>
      <select
        onChange={event => {
          setLanguage(event.target.value);
        }}
        className={styles.languageSelector}
      >
        {
          languageOptions.map(language => (
            <option
              key={language.code}
              value={language.code}
            >
              {language.name}
            </option>
          ))
        }
      </select>
    </div>
  </div>
);

export default LanguageSelector;
