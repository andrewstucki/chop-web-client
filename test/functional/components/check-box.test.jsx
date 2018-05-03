import Adapter from 'enzyme-adapter-react-16';
import CheckBox from '../../../src/components/check-box';
import Enzyme from 'enzyme';
import React from 'react';
//import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

test('Button has correct text', () => {
  const wrapper = Enzyme.shallow(<CheckBox />);
  expect(wrapper.find('label').length).toEqual(1);
});

test('Button has correct text', () => {
  const wrapper = Enzyme.shallow(<CheckBox label="Click Me!" />);
  expect(wrapper.find('label').text()).toEqual('Click Me!');
});

test('Button has correct text', () => {
  const wrapper = Enzyme.shallow(<CheckBox />);
  expect(wrapper.find('input').length).toEqual(1);
});