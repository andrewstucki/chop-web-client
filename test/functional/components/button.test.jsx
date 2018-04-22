import Adapter from 'enzyme-adapter-react-16';
import Button from '../../../src/components/button';
import Enzyme from 'enzyme';
import React from 'react';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

test('Button has correct text', () => {
  const wrapper = Enzyme.shallow(<Button text="Maranatha" />);
  expect(wrapper.text()).toEqual('Maranatha');
});

test('Button clickable', () => {
  const onButtonClick = sinon.spy();
  const wrapper = Enzyme.shallow(<Button click={onButtonClick} />);
  wrapper.find('button').simulate('click');
  expect(onButtonClick.calledOnce).toEqual(true);
});