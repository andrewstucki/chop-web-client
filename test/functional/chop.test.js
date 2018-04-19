import Adapter from 'enzyme-adapter-react-16';
import Chop from '../../src/chop';
import Enzyme from 'enzyme';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });

test('Test Chop', () => {
  const wrapper = Enzyme.shallow(<Chop />);
  expect(wrapper.text()).toEqual('Hello');
});