// @flow
import React from 'react';

import styles from './style.css';

type LanguageSelectorPropsType = {
  setLanguage: (language: string) => void,
  languageOptions: Array<string>,
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
              key={language}
              value={language}
            >
              {language}
            </option>
          ))
        }
      </select>
    </div>
  </div>
);

export default LanguageSelector;
