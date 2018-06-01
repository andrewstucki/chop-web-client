// @flow
import Adapter from 'enzyme-adapter-react-16';
import SideMenu from '../../../src/components/sideMenu';
import Enzyme from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import ReactTouchEvents from "react-touch-events";

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

  test('close', () => {
    const closeButton = sinon.spy();
    const wrapper = Enzyme.mount(
      <SideMenu close={closeButton} isClosed={false}>
        Hello
      </SideMenu>
    );
    wrapper.find('div').at(1).simulate('click');
    expect(closeButton.calledOnce).toEqual(true);
  });

  test('swipe close', () => {
    const swipeFunction = sinon.spy();
    const wrapper = Enzyme.mount(
      <SideMenu
        close={() => {}}
        isClosed={false}
        swipe={swipeFunction}>
        Hello
      </SideMenu>
    );
    wrapper.find(ReactTouchEvents).simulate('touchStart',
      { touches: [{ clientX: 100, clientY: 0 }]});
    wrapper.find(ReactTouchEvents).simulate('touchMove',
      { touches: [{ clientX: 50, clientY: 0 }]});
    wrapper.find(ReactTouchEvents).simulate('touchEnd',
      { touches: [{ clientX: 0, clientY: 0 }]});
    expect(swipeFunction.calledOnce).toEqual(true);
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
