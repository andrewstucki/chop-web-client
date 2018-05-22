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
      <SideMenu>
        Hello
      </SideMenu>
    );
    expect(wrapper.find('div').at(1).text()).toEqual('Hello');
  });

  test('close button', () => {
    const closeButton = sinon.spy();
    const wrapper = Enzyme.shallow(
      <SideMenu close={closeButton}>
        Hello
      </SideMenu>
    );
    expect(wrapper.find('button').text()).toEqual('X');
    wrapper.find('button').simulate('click');
    expect(closeButton.calledOnce).toEqual(true);
  });
})