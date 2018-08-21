// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import sinon from 'sinon';

import LanguageSelector from '../../src/languageSelector/languageSelector';

Enzyme.configure({ adapter: new Adapter() });

describe('LanguageSelector tests', () => {
  test('LanguageSelector renders', () => {
    const toggleLanguageSelector = sinon.spy();
    const wrapper = Enzyme.shallow(
      <LanguageSelector
        currentLanguage="English"
        toggleLanguageSelector={toggleLanguageSelector}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('container');
    expect(wrapper.find('button').at(0).props().className).toEqual('selectorToggle');
    expect(wrapper.find('div').at(1).text()).toEqual('Chat translation:');
    expect(wrapper.find('button').at(0).text()).toEqual('English');
    wrapper.find('button').at(0).simulate('click');
    expect(toggleLanguageSelector.calledOnce).toEqual(true);
  });
});
