// @flow
import React from 'react';

import type { LanguageType } from '../feed/dux';
import styles from './style.css';
import Globe from '../../assets/globe.svg';

type LanguageSelectorPropsType = {
  setLanguage: (language: string) => void,
  languageOptions: Array<LanguageType>,
};

const LanguageSelector = (
  {
    setLanguage,
    languageOptions,
  }: LanguageSelectorPropsType
) => {
  const handleChange = event => setLanguage(event.target.value);

  return (
    <div className={styles.container}>
      <div className={styles.dropdownContainer}>
        <div
          dangerouslySetInnerHTML={{ __html: Globe }}
          className={styles.globe}
        />
        <select
          onChange={handleChange}
          onBlur={handleChange}
          className={styles.languageSelector}
          tabIndex="-1"
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
};

export default React.memo < LanguageSelectorPropsType > (LanguageSelector);
