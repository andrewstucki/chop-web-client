// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import SideMenu from '../../src/sideMenu/sideMenu';
import SideMenuComponent from '../../src/components/sideMenu';
import Button from '../../src/components/button';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

describe('SideBar tests', () => {
  test('SideBar renders', () => {
    const closeFunction = () => {};
    const wrapper = Enzyme.shallow(
      <SideMenu
        logout={() => {}}
        close={closeFunction}
        isClosed={false} />
    );
    expect(wrapper.find(SideMenuComponent).length).toBe(1);
    expect(wrapper.find(SideMenuComponent).props().isClosed).toBe(false);
    expect(wrapper.find(SideMenuComponent).props().close).toBe(closeFunction);
  });

  test('SideBar has link to guest experience', () => {
    const wrapper = Enzyme.shallow(
      <SideMenu
        logout={() => {}}
        close={() => {}}
        isClosed={false} />
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
        isClosed={false} />
    );
    expect(wrapper.find('#feedback').length)
      .toBe(1);
    expect(wrapper.find('#feedback').text())
      .toBe('Give feedback');
    expect(wrapper.find('#feedback').props().href)
      .toBe('https://lifechurch.formstack.com/forms/host_mobile_feedback');
  });

  test('SideBar has logout button', () => {
    const logoutButton = sinon.spy();
    const wrapper = Enzyme.mount(
      <SideMenu
        logout={logoutButton}
        close={() => {}}
        isClosed={false} />
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