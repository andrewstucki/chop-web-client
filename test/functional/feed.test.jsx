// @flow
import Adapter from 'enzyme-adapter-react-16';
import Feed from '../../src/feed/feed';
import Message from '../../src/components/message';
import Enzyme from 'enzyme';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });

describe('Feed tests', () => {
  test('has an empty feed', () => {
    const wrapper = Enzyme.shallow(
      <Feed />
    );
    expect(wrapper.find('ul').children().length).toBe(0);
  });
  test('has a single message', () => {
    const moments = [{ id: 'string', message: 'This is a message' }];
    const wrapper = Enzyme.mount(
      <Feed moments={moments} />
    );
    expect(wrapper.find('ul').children().length).toBe(1);
    expect(wrapper.find('ul').childAt(0).type()).toEqual('li');
    expect(wrapper.find(Message).find('div').last().text()).toEqual('This is a message');
  });
});
