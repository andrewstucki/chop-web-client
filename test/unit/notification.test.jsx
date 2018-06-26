// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

import Notification from '../../src/moment/notification';

Enzyme.configure({ adapter: new Adapter() });

describe('Notification test', () => {
  test('Prayer notification renders', () => {
    const wrapper = Enzyme.shallow(
      <Notification
        notification={
          {
            type: 'NOTIFICATION',
            notificationType: 'PRAYER',
            host: 'yablby',
            guest: 'cookietree',
            timeStamp: '9:33pm',
          }
        }
      />
    );
    expect(wrapper.find('div').at(1).props().className).toEqual('notification');
    expect(wrapper.find('span').at(0).props().className).toEqual('icon');
    expect(wrapper.find('div').at(3).text()).toEqual(
      'yablby started a live prayer with cookietree'
    );
    expect(wrapper.find('div').at(4).text()).toEqual('9:33pm');
  });

  test('Joined chat notification renders', () => {
    const wrapper = Enzyme.shallow(
      <Notification
        notification={
          {
            type: 'NOTIFICATION',
            notificationType: 'JOINED_CHAT',
            name: 'cookietree',
            timeStamp: '9:33pm',
          }
        }
      />
    );
    expect(wrapper.find('div').at(1).props().className).toEqual('notification');
    expect(wrapper.find('span').at(0).props().className).toEqual('icon');
    expect(wrapper.find('div').at(3).text()).toEqual(
      'cookietree has joined the chat'
    );
    expect(wrapper.find('div').at(4).text()).toEqual('9:33pm');
  });

  test('Joined chat notification renders', () => {
    const wrapper = Enzyme.shallow(
      <Notification
        notification={
          {
            type: 'NOTIFICATION',
            notificationType: 'LEFT_CHAT',
            name: 'cookietree',
            timeStamp: '9:33pm',
          }
        }
      />
    );
    expect(wrapper.find('div').at(1).props().className).toEqual('notification');
    expect(wrapper.find('span').at(0).props().className).toEqual('icon');
    expect(wrapper.find('div').at(3).text()).toEqual(
      'cookietree has left the chat'
    );
    expect(wrapper.find('div').at(4).text()).toEqual('9:33pm');
  });
});
