// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import NavMenu from '../../src/navMenu/navMenu';
import { mountWithTheme } from '../testUtils';
import { NavMenuButton, NavMenuHeader, NavMenuBodySection, NavMenuTextWrapper } from '../../src/navMenu/styles';


Enzyme.configure({ adapter: new Adapter() });

const getMountedNavMenu = (expanded?:boolean) => {
  const _expanded = typeof expanded === 'boolean' ? expanded : true;
  return mountWithTheme(
    <NavMenu
      organizationName="Church of Awesome!"
      publicChannel={
        {
          hasActions: false,
          id: '998056925ead69f1f74047e57a8a84622db90754f9776257a80525d84860850c',
          isCurrent: true,
          isDirect: false,
          name: 'Public',
          otherSubscribersNames: [],
          type: 'EVENT',
        }
      }
      hostChannel={
        {
          hasActions: false,
          id: 'a70c52181da2f13f1f8313894c6125e2cdb87f1844fc785fb87988bc4725f2bc',
          isCurrent: false,
          isDirect: false,
          name: 'Host',
          otherSubscribersNames: [],
          type: 'CHAT',
        }
      }
      directChannels={[
        {
          hasActions: false,
          id: 'fd69c5b7fc417f7b42270f63e68361ab590c0872194b43ac700d9955cf7644e1',
          isCurrent: false,
          isDirect: true,
          name: 'Direct',
          otherSubscribersNames: ['Eric Lutz'],
          type: 'CHAT',
        }]}
      setPaneToEvent={() => {}}
      setPaneToChat={() => {}}
      setPaneToTab={() => {}}
      openMenu={() => {}}
      expanded={_expanded}
      toggleExpanded={() => {}}
      currentTabType=""
    />
  );
};

describe('NavMenu tests', () => {
  test('NavMenu renders expanded', () => {
    const wrapper = getMountedNavMenu();
    expect(wrapper.exists(NavMenu)).toBeTruthy();
    expect(wrapper.find(NavMenuHeader).text()).toEqual('Church of Awesome!');
    expect(wrapper.find(NavMenuBodySection).length).toBe(2);
    expect(wrapper.find(NavMenuBodySection).at(0).find(NavMenuTextWrapper).text()).toEqual('Eric Lutz');
    expect(wrapper.find(NavMenuBodySection).at(1).find(NavMenuButton).length).toBe(6);
  });

  test('NavMenu renders collapsed', () => {
    const wrapper = getMountedNavMenu(false);
    expect(wrapper.exists(NavMenu)).toBeTruthy();
    expect(wrapper.find(NavMenuHeader).text()).not.toEqual('Church of Awesome!');
    expect(wrapper.find(NavMenuBodySection).length).toBe(2);
    expect(wrapper.find(NavMenuBodySection).at(0).find(NavMenuTextWrapper).length).toBe(0);
    expect(wrapper.find(NavMenuBodySection).at(1).find(NavMenuButton).length).toBe(6);
    expect(wrapper.find(NavMenuBodySection).at(1).find(NavMenuTextWrapper).length).toBe(0);
  });
});