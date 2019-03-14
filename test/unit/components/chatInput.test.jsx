// @flow
import Adapter from 'enzyme-adapter-react-16';
import ChatInput from '../../../src/components/chatInput';
import Enzyme from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import { mountWithTheme } from '../../testUtils';

Enzyme.configure({ adapter: new Adapter() });

describe('ChatInput', () => {
  test('Value can be changed..', () => {
    const onInputChange = sinon.spy();
    const wrapper = mountWithTheme(
      <ChatInput
        id="chat"
        onChange={onInputChange}
        onFocus={() => {}}
        onBlur={() => {}}
        value='message'
        placeholder='Chat'
        enterDetect={() => {}}
      />
    );

    expect(wrapper.find('input').prop('type')).toEqual('text');
    wrapper.find('input').simulate('change');
    expect(onInputChange.calledOnce).toEqual(true);
  });
});

