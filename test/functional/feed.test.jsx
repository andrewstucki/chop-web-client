// @flow
import Adapter from 'enzyme-adapter-react-16';
import Feed from '../../src/feed/feed';
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
        appendingMessage={false}
      />
    );
    expect(wrapper.find('ul').children().length).toBe(0);
  });

  test('has a single message', () => {
    const moments = [
      {
        id: 'string',
        message: 'This is a message',
        user: {
          id: '12345',
          nickname: 'Billy Bob',
        },
        messageTrayOpen: false,
      },
    ];
    const wrapper = Enzyme.shallow(
      <Feed
        offset={0}
        moments={moments}
        onMessageRender={function () {}}
        channel="default"
        appendingMessage={false}
      />
    );
    
    expect(wrapper.find('ul').children().length).toBe(1);
    expect(wrapper.find('li').at(0).childAt(0).props()).toEqual({
      appendingMessage: false,
      message: {
        id: 'string',
        message: 'This is a message',
        user: {
          id: '12345',
          nickname: 'Billy Bob',
        },
        messageTrayOpen: false,
      },
    });
  });

  test('check for key prop', () => {
    const wrapper = Enzyme.shallow(
      <Feed
        offset={0}
        moments={[]}
        onMessageRender={function () {}}
        channel="default"
        appendingMessage={false}
      />
    );
    expect(wrapper.find('ul').key()).toEqual('default');
  });
});
