// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import sinon from 'sinon';

import LanguageSelector from '../../src/languageSelector';

Enzyme.configure({ adapter: new Adapter() });

describe('LanguageSelector tests', () => {
  test('LanguageSelector renders', () => {
    const setLanguage = sinon.spy();
    const event = {
      target: {
        value: 'English',
      },
    };
    const wrapper = Enzyme.shallow(
      <LanguageSelector
        languageOptions={
          [
            'English',
            'Japanese',
            'French',
            'Spanish',
            'German',
            'Italian',
            'Korean',
          ]
        }
        setLanguage={setLanguage}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('container');
    expect(wrapper.find('select').at(0).props().className).toEqual('languageSelector');
    expect(wrapper.find('div').at(1).text()).toEqual('Chat translation:');
    expect(wrapper.find('option').at(0).text()).toEqual('English');
    wrapper.find('select').at(0).simulate('change', event);
    expect(setLanguage.calledOnce).toEqual(true);
  });
});
