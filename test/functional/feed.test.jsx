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
      <Feed
        offset={0}
        onMessageRender={function () {}}
        channel="default"
      />
    );
    expect(wrapper.find('ul').children().length).toBe(0);
  });

  test('has a single message', () => {
    const moments = [
      {
        id: 'string',
        message: 'This is a message',
        neverRendered: true,
        user: {
          id: '12345',
          nickname: 'Billy Bob',
        }
      }
    ];
    const wrapper = Enzyme.mount(
      <Feed
        offset={0}
        moments={moments}
        onMessageRender={function () {}}
        channel="default"
      />
    );
    expect(wrapper.find('ul').children().length).toBe(1);
    expect(wrapper.find('ul').childAt(0).type()).toEqual('li');
    expect(wrapper.find(Message).find('div').last().text()).toEqual('This is a message');
  });

  test('check for key prop', () => {
    const wrapper = Enzyme.shallow(
      <Feed
        offset={0}
        moments={[]}
        onMessageRender={function () {}}
        channel="default"
      />
    );
    expect(wrapper.find('ul').key()).toEqual('default');
  });
});
