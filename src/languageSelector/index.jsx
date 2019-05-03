// @flow
import React from 'react';

import type { LanguageType } from '../feed/dux';
import Globe from '../../assets/globe.svg';
import { useTranslation } from 'react-i18next';
import { Wrapper, DropdownContainer, GlobeContainer, LanguageSelect } from './styles';

type LanguageSelectorPropsType = {
  setLanguage: (language: string) => void,
  languageOptions: Array<LanguageType>,
  currentLanguage: string,
};

const LanguageSelector = (
  {
    setLanguage,
    languageOptions,
    currentLanguage,
  }: LanguageSelectorPropsType
) => {
  const { i18n } = useTranslation();

  const handleChange = event => {
    const { value } = event.target;
    if (currentLanguage !== value) {
      setLanguage(value);
      i18n.changeLanguage(value);
    }
  };

  return (
    <Wrapper data-testid='languageSelector'>
      <DropdownContainer>
        <GlobeContainer
          dangerouslySetInnerHTML={{ __html: Globe }}
        />
        <LanguageSelect
          data-testid='languageSelector-select'
          onChange={handleChange}
          onBlur={handleChange}
          tabIndex="-1"
          value={currentLanguage}
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
        </LanguageSelect>
      </DropdownContainer>
    </Wrapper>
  );
};

export default React.memo < LanguageSelectorPropsType > (LanguageSelector);
