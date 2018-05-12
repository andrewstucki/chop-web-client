// @flow
import Adapter from 'enzyme-adapter-react-16';
import Message from '../../../src/components/message';
import Enzyme from 'enzyme';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });

describe('Message', () => {
  test('has correct text', () => {
    const wrapper = Enzyme.shallow(<Message message="Go west young man!" />);
    expect(wrapper.find('div').last().text()).toEqual('Go west young man!');
  });
});