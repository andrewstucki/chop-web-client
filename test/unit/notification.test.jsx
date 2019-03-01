// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { mountWithTheme } from '../testUtils';

import Notification from '../../src/moment/notification';

Enzyme.configure({ adapter: new Adapter() });

describe('Notification test', () => {
  test('Prayer notification renders', () => {
    const wrapper = mountWithTheme(
      <Notification
        notification={
          {
            type: 'NOTIFICATION',
            notificationType: 'PRAYER',
            id: '12345',
            host: 'yablby',
            guest: 'cookietree',
            timestamp: '9:33pm',
          }
        }
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('notification');
    expect(wrapper.find('span').at(0).props().className).toEqual('icon');
    expect(wrapper.find('div').at(2).text()).toEqual(
      'yablby started a live prayer with cookietree'
    );
    expect(wrapper.find('div').at(3).text()).toEqual('9:33pm');
  });

  test('Joined chat notification renders', () => {
    const wrapper = mountWithTheme(
      <Notification
        notification={
          {
            type: 'NOTIFICATION',
            notificationType: 'JOINED_CHAT',
            id: '12345',
            name: 'cookietree',
            timestamp: '9:33pm',
          }
        }
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('notification');
    expect(wrapper.find('span').at(0).props().className).toEqual('icon');
    expect(wrapper.find('div').at(2).text()).toEqual(
      'cookietree has joined the chat'
    );
    expect(wrapper.find('div').at(3).text()).toEqual('9:33pm');
  });

  test('Left channel notification renders', () => {
    const wrapper = mountWithTheme(
      <Notification
        notification={
          {
            type: 'NOTIFICATION',
            notificationType: 'LEFT_CHANNEL',
            id: '12345',
            name: 'cookietree',
            timestamp: '9:33pm',
          }
        }
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('notification');
    expect(wrapper.find('span').at(0).props().className).toEqual('icon');
    expect(wrapper.find('div').at(2).text()).toEqual(
      'cookietree has left the chat'
    );
    expect(wrapper.find('div').at(3).text()).toEqual('9:33pm');
  });

  test('Mute notification renders with a host', () => {
    const wrapper = mountWithTheme(
      <Notification
        notification={
          {
            type: 'NOTIFICATION',
            notificationType: 'MUTE',
            id: '12345',
            host: 'host',
            guest: 'guest',
            timestamp: '9:33pm',
          }
        }
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('notification');
    expect(wrapper.find('span').at(0).props().className).toEqual('icon');
    expect(wrapper.find('div').at(2).text()).toEqual(
      'host muted guest'
    );
    expect(wrapper.find('div').at(3).text()).toEqual('9:33pm');
  });

  test('Mute notification renders without a host', () => {
    const wrapper = mountWithTheme(
      <Notification
        notification={
          {
            type: 'NOTIFICATION',
            notificationType: 'MUTE',
            id: '12345',
            host: '',
            guest: 'guest',
            timestamp: '9:33pm',
          }
        }
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('notification');
    expect(wrapper.find('span').at(0).props().className).toEqual('icon');
    expect(wrapper.find('div').at(2).text()).toEqual(
      'guest was muted'
    );
    expect(wrapper.find('div').at(3).text()).toEqual('9:33pm');
  });
});
