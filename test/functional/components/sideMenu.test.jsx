// @flow
import Adapter from 'enzyme-adapter-react-16';
import SideMenu from '../../../src/components/sideMenu';
import Enzyme from 'enzyme';
import React from 'react';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

describe('SideMenu tests', () => {
  test('with child content', () => {
    const wrapper = Enzyme.shallow(
      <SideMenu close={() => {}} isClosed={false}>
        Hello
      </SideMenu>
    );
    expect(wrapper.find('div').at(2).text()).toEqual('Hello');
  });

  test('closed', () => {
    const wrapper = Enzyme.shallow(
      <SideMenu close={() => {}} isClosed={true}>
        Hello
      </SideMenu>
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('closed');
  });

  test('open', () => {
    const wrapper = Enzyme.shallow(
      <SideMenu close={() => {}} isClosed={false}>
        Hello
      </SideMenu>
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('open');
  });
});
