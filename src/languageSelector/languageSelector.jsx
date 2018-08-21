// @flow
import React from 'react';

import Caret from '../../assets/caret-down.svg';
import styles from './style.css';

type LanguageSelectorPropsType = {
  toggleLanguageSelector: () => void,
  currentLanguage: string,
};

const LanguageSelector = (
  {
    toggleLanguageSelector,
    currentLanguage,
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
        {currentLanguage}
      </button>
      <span
        className={styles.caret}
        dangerouslySetInnerHTML={{ __html: Caret }}
      />
    </div>
  </div>
);

export default LanguageSelector;
