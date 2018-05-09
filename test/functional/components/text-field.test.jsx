// @flow
import Adapter from 'enzyme-adapter-react-16';
import TextField from '../../../src/components/text-field';
import Enzyme from 'enzyme';
import React from 'react';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

describe('TextField tests', () => {
  test('keyup on typeing', () => {
    const onKeyUp = sinon.spy();
    const wrapper = Enzyme.shallow(
      <TextField onInput={onKeyUp} />);
    const event = { target: { value: 'Love' } };
    const input = wrapper.find('input');
    input.simulate('change', event);
    expect(onKeyUp.calledWith(event)).toBeTruthy();
  });

  test('has value', () => {
    const wrapper = Enzyme.shallow(
      <TextField value="Love" />);
    const input = wrapper.find('input');
    expect(input.props().value).toEqual('Love');
  });

  test('onFocus', () => {
    const onFocus = sinon.spy();
    const wrapper = Enzyme.shallow(
      <TextField onFocus={onFocus} />);
    const event = { target: { value: 'Love' } };
    const input = wrapper.find('input');
    input.simulate('focus', event);
    expect(onFocus.calledWith(event)).toBeTruthy();
  });

  test('onBlur', () => {
    const onBlur = sinon.spy();
    const wrapper = Enzyme.shallow(
      <TextField onBlur={onBlur} />);
    const event = { target: { value: 'Love' } };
    const input = wrapper.find('input');
    input.simulate('blur', event);
    expect(onBlur.calledWith(event)).toBeTruthy();
  });

  test('Placeholder text', () => {
    const wrapper = Enzyme.shallow(
      <TextField placeholder="Chat" />);
    const input = wrapper.find('input');
    expect(input.props().placeholder).toEqual('Chat');
  })
});