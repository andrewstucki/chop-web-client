// @flow
import React from 'react';
import sinon from 'sinon';
import LanguageSelector from '../../src/languageSelector';
import { renderWithTheme } from '../testUtils';
import { fireEvent } from 'react-testing-library';

describe('LanguageSelector tests', () => {
  test('LanguageSelector renders', () => {
    const setLanguage = sinon.spy();
    const event = {
      target: {
        value: 'fr',
      },
    };
    const { getByTestId } = renderWithTheme(
      <LanguageSelector
        languageOptions={
          [
            {
              code: 'en',
              name: 'English',
            },
            {
              code: 'ja-jp',
              name: 'Japanese',
            },
            {
              code: 'fr',
              name: 'French',
            },
            {
              code: 'sp',
              name: 'Spanish',
            },
            {
              code: 'gm',
              name: 'German',
            },
            {
              code: 'it',
              name: 'Italian',
            },
            {
              code: 'ko',
              name: 'Korean',
            },
          ]
        }
        setLanguage={setLanguage}
        currentLanguage='en'
      />
    );

    const select = getByTestId('languageSelector-select');
    expect(select.children[0].value).toEqual('en');
    fireEvent.change(select, event);
    expect(setLanguage.calledOnce).toEqual(true);
    expect(setLanguage.calledWith('fr')).toBeTrue();
  });
});
