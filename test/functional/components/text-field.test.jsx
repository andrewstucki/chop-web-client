import Adapter from 'enzyme-adapter-react-16';
import TextField from '../../../src/components/text-field';
import Enzyme from 'enzyme';
import React from 'react';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

test('TextField keyup on typeing', () => {
  const onKeyUp = sinon.spy();
  const wrapper = Enzyme.shallow(<TextField onInput={onKeyUp} />);
  const event = { target: { value: 'Love' } };
  const input = wrapper.find('input');
  input.simulate('keyup', event);
  expect(onKeyUp.calledWith()).toBeTruthy();
});

test('TextField has value', () => {
  const wrapper = Enzyme.shallow(<TextField value="Love" />);
  const input = wrapper.find('input');
  expect(input.props().value).toEqual('Love');
});