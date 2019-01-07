// @flow
import Adapter from 'enzyme-adapter-react-16';
import Button from '../../../src/components/button';
import Enzyme from 'enzyme';
import React from 'react';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

test('Button has correct text', () => {
  const wrapper = Enzyme.shallow(
    <Button
      buttonId="login"
      onClick={() => {}}
      text="Maranatha"
      buttonStyle="primary"
    />
  );
  expect(wrapper.text()).toEqual('Maranatha');
});

test('Button clickable', () => {
  const onButtonClick = sinon.spy();
  const wrapper = Enzyme.shallow(
    <Button
      text="Love"
      onClick={onButtonClick}
      buttonStyle="primary"
    />);
  wrapper.find('button').simulate('click');
  expect(onButtonClick.calledOnce).toEqual(true);
});

test('Button default type', () => {
  const wrapper = Enzyme.shallow(
    <Button
      text="Click Me"
      onClick={function () {}}
      buttonStyle="primary"
    />
  );
  expect(wrapper.find('button').props().className)
    .toEqual('button primary  default');
});

test('Button icon type', () => {
  const wrapper = Enzyme.shallow(
    <Button
      text="Click Me"
      onClick={function () {}}
      buttonStyle="icon"
    />
  );
  expect(wrapper.find('button').props().className)
    .toEqual('button icon  default');
});
