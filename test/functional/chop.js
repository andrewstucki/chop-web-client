import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Chop from '../../src/chop';

Enzyme.configure({ adapter: new Adapter() });

test('Test Chop', () => {
  const wrapper = Enzyme.shallow(<Chop />);
  expect(wrapper.text()).toEqual('Hello');
});