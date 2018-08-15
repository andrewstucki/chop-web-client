// @flow
import React from 'react';

import Caret from '../../assets/caret-down.svg';
import styles from './style.css';

type LanguageSelectorPropsType = {
  toggleLanguageSelector: () => void,
  languageName: string,
};

const LanguageSelector = (
  {
    toggleLanguageSelector,
    languageName,
  }: LanguageSelectorPropsType
) => (
  <div className={styles.container}>
    <div className={styles.text}>
      Chat translation:
    </div>
    <div className={styles.buttonContainer}>
      <button
        onClick={() => {
          toggleLanguageSelector();
        }}
        className={styles.selectorToggle}
      >
        {languageName}
      </button>
      <span
        className={styles.caret}
        dangerouslySetInnerHTML={{ __html: Caret }}
      />
    </div>
  </div>
);

export default LanguageSelector;
