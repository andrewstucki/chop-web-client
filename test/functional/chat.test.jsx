import Adapter from 'enzyme-adapter-react-16';
import Button from '../../src/components/button';
import TextField from '../../src/components/text-field';
import Chat from '../../src/chat/chat';
import Enzyme from 'enzyme';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });

test('Chat has a TextField and Button', () => {
  const wrapper = Enzyme.shallow(<Chat />);
  expect(wrapper.find(TextField).length).toBe(1);
  expect(wrapper.find(Button).length).toBe(1);
});