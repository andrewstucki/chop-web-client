// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import sinon from 'sinon';

import Button from '../../src/components/button';
import SideMenuComponent from '../../src/components/sideMenu';
import SideMenu from '../../src/sideMenu/sideMenu';
import LanguageSelector from '../../src/languageSelector';

Enzyme.configure({ adapter: new Adapter() });

const languageOptions = [
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
];

describe('SideBar tests', () => {
  test('SideBar renders', () => {
    const closeFunction = () => {};
    const wrapper = Enzyme.shallow(
      <SideMenu
        logout={() => {}}
        close={closeFunction}
        isClosed={false}
        languageOptions={languageOptions}
        setLanguage={() => {}}
      />
    );
    expect(wrapper.find(SideMenuComponent).length).toBe(1);
    expect(wrapper.find(SideMenuComponent).props().isClosed).toBe(false);
    expect(wrapper.find(SideMenuComponent).props().close).toBe(closeFunction);
    expect(wrapper.find(LanguageSelector).length).toBe(1);
  });

  test('SideBar has link to guest experience', () => {
    const wrapper = Enzyme.shallow(
      <SideMenu
        logout={() => {}}
        close={() => {}}
        isClosed={false}
        languageOptions={languageOptions}
        setLanguage={() => {}}
      />
    );
    expect(wrapper.find('#guest-experience').length)
      .toBe(1);
    expect(wrapper.find('#guest-experience').text())
      .toBe('Switch to guest experience');
    expect(wrapper.find('#guest-experience').props().href)
      .toBe('https://live.life.church/');
  });

  test('SideBar has link to give feedback', () => {
    const wrapper = Enzyme.shallow(
      <SideMenu
        logout={() => {}}
        close={() => {}}
        isClosed={false}
        languageOptions={languageOptions}
        setLanguage={() => {}}
      />
    );
    expect(wrapper.find('#feedback').length)
      .toBe(1);
    expect(wrapper.find('#feedback').text())
      .toBe('Give feedback');
    expect(wrapper.find('#feedback').props().href)
      .toBe('https://lifechurch.formstack.com/forms/host_feedback_2');
  });

  test('SideBar has logout button', () => {
    const logoutButton = sinon.spy();
    const wrapper = Enzyme.mount(
      <SideMenu
        logout={logoutButton}
        close={() => {}}
        isClosed={false}
        languageOptions={languageOptions}
        setLanguage={() => {}}
      />
    );
    expect(wrapper.find(Button).length)
      .toBe(1);
    expect(wrapper.find(Button).text())
      .toBe('Log out');
    wrapper.find(Button).simulate('click');
    expect(logoutButton.calledOnce)
      .toBe(true);
  });
});
