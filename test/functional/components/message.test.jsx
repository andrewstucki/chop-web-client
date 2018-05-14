// @flow
import Adapter from 'enzyme-adapter-react-16';
import Message from '../../../src/components/message';
import Enzyme from 'enzyme';
import React from 'react';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

describe('Message', () => {
  test('has correct text', () => {
    const messageMount = sinon.spy();
    const wrapper = Enzyme.mount(
      <Message
        id="1234"
        message="Go west young man!"
        onMount={messageMount} />);
    expect(wrapper.find('div').last().text()).toEqual('Go west young man!');
    expect(messageMount.calledOnce).toEqual(true);
    // NOTE: We cannot test the rendering height of the Message
    // without actule rendering in the browser.
  });
});