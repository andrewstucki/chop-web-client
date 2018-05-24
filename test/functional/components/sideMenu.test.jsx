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
    expect(wrapper.find('div').at(1).text()).toEqual('Hello');
  });

  test('close button', () => {
    const closeButton = sinon.spy();
    const wrapper = Enzyme.mount(
      <SideMenu close={closeButton} isClosed={false}>
        Hello
      </SideMenu>
    );
    expect(wrapper.find('button').text()).toEqual('SVG');
    wrapper.find('button').simulate('click');
    expect(closeButton.calledOnce).toEqual(true);
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
