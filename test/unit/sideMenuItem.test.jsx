// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import 'jest-styled-components';
import SideMenuItem from '../../src/sideMenu/sideMenuItem';
import UpArrow from '../../assets/large-arrow-up.svg';
import { Wrapper, Title } from '../../src/sideMenu/sideMenuItem/styles';
import { mountWithTheme } from '../testUtils';

Enzyme.configure({ adapter: new Adapter() });

describe('SideMenuItem tests', () => {
  test('SideMenuItem renders', () => {
    const wrapper = mountWithTheme(
      <SideMenuItem
        active={true}
        icon={UpArrow}
        title='Test'
        onClick={() => {}}
      />
    );

    expect(wrapper.find(SideMenuItem).exists()).toEqual(true);
    expect(wrapper.find(Title).text()).toEqual('Test');
    // $FlowFixMe
    expect(wrapper.find(Wrapper)).toHaveStyleRule('color', '#404041');
  });

  test('SideMenuItem inactive state', () => {
    const wrapper = mountWithTheme(
      <SideMenuItem
        active={false}
        icon={UpArrow}
        title='Test'
        onClick={() => {}}
      />
    );

    expect(wrapper.find(SideMenuItem).exists()).toEqual(true);
    expect(wrapper.find(Title).text()).toEqual('Test');
    // $FlowFixMe
    expect(wrapper.find(Wrapper)).toHaveStyleRule('color', '#9f9fa0');
  });
});
