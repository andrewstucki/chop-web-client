// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import sinon from 'sinon';

import SideMenuComponent from '../../src/components/sideMenu';
import SideMenu from '../../src/sideMenu/sideMenu';
import LanguageSelector from '../../src/languageSelector';
import { mountWithTheme } from '../testUtils';
import {EventDescription, EventTitle, OrganizationTitle} from '../../src/sideMenu/styles';
import Avatar from '../../src/avatar';

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

const currentPane = {
  type: 'EVENT',
  content: {
    channelId: 'host',
  },
};

const currentUser = {
  id: '134',
  pubnubToken: '12sd0fj230jsdf;',
  name: 'Kylo Ren',
  avatarUrl: 'http://someimageons3.com/image/123',
  role: {
    label: 'Supreme Leader of the First Order',
  },
};

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
        currentPane={currentPane}
        hostChannel='host'
        publicChannel='public'
        setPaneToChat={() => {}}
        setPaneToEvent={() => {}}
        setPaneToTab={() => {}}
        addTab={() => {}}
        currentUser={currentUser}
        eventDescription='The Description'
        eventTitle='Evenet Title'
        organizationName='The Church'
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
        currentPane={currentPane}
        hostChannel='host'
        publicChannel='public'
        setPaneToChat={() => {}}
        setPaneToEvent={() => {}}
        setPaneToTab={() => {}}
        addTab={() => {}}
        currentUser={currentUser}
        eventDescription='The Description'
        eventTitle='Evenet Title'
        organizationName='The Church'
      />
    );
    expect(wrapper.find('#guest-experience').length)
      .toBe(1);
    expect(wrapper.find('#guest-experience').text())
      .toBe('Guest experience');
  });

  test('SideBar has link to give feedback', () => {
    const wrapper = Enzyme.shallow(
      <SideMenu
        logout={() => {}}
        close={() => {}}
        isClosed={false}
        languageOptions={languageOptions}
        setLanguage={() => {}}
        currentPane={currentPane}
        hostChannel='host'
        publicChannel='public'
        setPaneToChat={() => {}}
        setPaneToEvent={() => {}}
        setPaneToTab={() => {}}
        addTab={() => {}}
        currentUser={currentUser}
        eventDescription='The Description'
        eventTitle='Evenet Title'
        organizationName='The Church'
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
    const wrapper = mountWithTheme(
      <SideMenu
        logout={logoutButton}
        close={() => {}}
        isClosed={false}
        languageOptions={languageOptions}
        setLanguage={() => {}}
        currentPane={currentPane}
        hostChannel='host'
        publicChannel='public'
        setPaneToChat={() => {}}
        setPaneToEvent={() => {}}
        setPaneToTab={() => {}}
        addTab={() => {}}
        currentUser={currentUser}
        eventDescription='The Description'
        eventTitle='Evenet Title'
        organizationName='The Church'
      />
    );
    expect(wrapper.find('#logout').length)
      .toBe(1);
    expect(wrapper.find('#logout').text())
      .toBe('File Log Out');
    wrapper.find('#logout').simulate('click');
    expect(logoutButton.calledOnce)
      .toBe(true);
  });

  test('SideBar has organization title', () => {
    const wrapper = mountWithTheme(
      <SideMenu
        logout={() => {}}
        close={() => {}}
        isClosed={false}
        languageOptions={languageOptions}
        setLanguage={() => {}}
        currentPane={currentPane}
        hostChannel='host'
        publicChannel='public'
        setPaneToChat={() => {}}
        setPaneToEvent={() => {}}
        setPaneToTab={() => {}}
        addTab={() => {}}
        currentUser={currentUser}
        eventDescription='The Description'
        eventTitle='Event Title'
        organizationName='The Church'
      />
    );
    expect(wrapper.find(OrganizationTitle).length)
      .toBe(1);
    expect(wrapper.find(OrganizationTitle).text())
      .toBe('The Church');
  });

  test('SideBar has event information', () => {
    const wrapper = mountWithTheme(
      <SideMenu
        logout={() => {}}
        close={() => {}}
        isClosed={false}
        languageOptions={languageOptions}
        setLanguage={() => {}}
        currentPane={currentPane}
        hostChannel='host'
        publicChannel='public'
        setPaneToChat={() => {}}
        setPaneToEvent={() => {}}
        setPaneToTab={() => {}}
        addTab={() => {}}
        currentUser={currentUser}
        eventDescription='The Description'
        eventTitle='Event Title'
        organizationName='The Church'
      />
    );
    expect(wrapper.find(EventTitle).length)
      .toBe(1);
    expect(wrapper.find(EventTitle).text())
      .toBe('Event Title');
    expect(wrapper.find(EventDescription).length)
      .toBe(1);
    expect(wrapper.find(EventDescription).text())
      .toBe('The Description');
  });

  test('SideBar has avatar', () => {
    const wrapper = mountWithTheme(
      <SideMenu
        logout={() => {}}
        close={() => {}}
        isClosed={false}
        languageOptions={languageOptions}
        setLanguage={() => {}}
        currentPane={currentPane}
        hostChannel='host'
        publicChannel='public'
        setPaneToChat={() => {}}
        setPaneToEvent={() => {}}
        setPaneToTab={() => {}}
        addTab={() => {}}
        currentUser={currentUser}
        eventDescription='The Description'
        eventTitle='Event Title'
        organizationName='The Church'
      />
    );
    expect(wrapper.find(Avatar).length)
      .toBe(1);
  });
});
