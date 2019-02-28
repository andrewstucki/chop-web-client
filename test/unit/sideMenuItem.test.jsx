// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import 'jest-styled-components';
import SideMenuItem from '../../src/sideMenu/sideMenuItem';
import Globe from '../../assets/globe.svg';
import { Wrapper, Title } from '../../src/sideMenu/sideMenuItem/styles';
import { mountWithTheme } from '../testUtils';
import { theme } from '../../src/styles';

Enzyme.configure({ adapter: new Adapter() });

describe('SideMenuItem tests', () => {
  test('SideMenuItem renders', () => {
    const wrapper = mountWithTheme(
      <SideMenuItem
        active={true}
        icon={Globe}
        title='Test'
        onClick={() => {}}
      />
    );

    expect(wrapper.find(SideMenuItem).exists()).toEqual(true);
    expect(wrapper.find(Title).text()).toEqual('Test');
    // $FlowFixMe
    expect(wrapper.find(Wrapper)).toHaveStyleRule('color', theme.colors.gray100);
  });

  test('SideMenuItem inactive state', () => {
    const wrapper = mountWithTheme(
      <SideMenuItem
        active={false}
        icon={Globe}
        title='Test'
        onClick={() => {}}
      />
    );

    expect(wrapper.find(SideMenuItem).exists()).toEqual(true);
    expect(wrapper.find(Title).text()).toEqual('Test');
    // $FlowFixMe
    expect(wrapper.find(Wrapper)).toHaveStyleRule('color', theme.colors.gray50);
  });
});
