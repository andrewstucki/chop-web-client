// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import sinon from 'sinon';
import { mountWithTheme } from '../testUtils';

import ActionableNotification from '../../src/moment/actionableNotification/actionableNotification';

Enzyme.configure({ adapter: new Adapter() });

const yablby = {
  id: '12345',
  pubnubToken: '12345',
  name: 'yablby',
  role: { label: '' },
};
const billBogus = {
  id: '12345',
  pubnubToken: '5483',
  name: 'Bill Bogus',
  role: { label: '' },
};
const hostChannel = {
  id: 'host',
  name: 'Host',
  moments: [],
  participants: [],
};

describe('ActionableNotification tests', () => {
  test('Active prayer request notification renders', () => {
    const acceptPrayerRequest = sinon.spy();
    const wrapper = mountWithTheme(
      <ActionableNotification
        notification={
          {
            type: 'ACTIONABLE_NOTIFICATION',
            notificationType: 'PRAYER_REQUEST',
            id: '12345',
            user: yablby,
            timestamp: '9:33pm',
            active: true,
            cancelled: false,
            prayerChannel: 'direct-chat-1234',
          }
        }
        acceptPrayerRequest={acceptPrayerRequest}
        currentUser={billBogus}
        hostChannel={hostChannel.id}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual(
      'actionableNotification'
    );
    expect(wrapper.find('span').at(0).props().className).toEqual('icon');
    expect(wrapper.find('div').at(3).text()).toEqual(
      'yablby has requested prayer'
    );
    expect(wrapper.find('div').at(4).text()).toEqual('9:33pm');
    expect(wrapper.find('button').at(0).text()).toEqual('Accept');
    wrapper.find('button').at(0).simulate('click');
    expect(acceptPrayerRequest.calledOnce).toEqual(true);
  });

  test('Inactive prayer request notification renders', () => {
    const wrapper = mountWithTheme(
      <ActionableNotification
        notification={
          {
            type: 'ACTIONABLE_NOTIFICATION',
            notificationType: 'PRAYER_REQUEST',
            id: '12345',
            user: yablby,
            timestamp: '9:33pm',
            active: false,
            cancelled: false,
            prayerChannel: 'direct-chat-12345',
          }
        }
        acceptPrayerRequest={() => {}}
        publishPrayerNotification={() => {}}
        currentUser={billBogus}
        hostChannel={hostChannel.id}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('notification');
    expect(wrapper.find('span').at(0).props().className).toEqual('icon');
    expect(wrapper.find('div').at(3).text()).toEqual(
      'yablby has requested prayer'
    );
    expect(wrapper.find('div').at(4).text()).toEqual('9:33pm');
    expect(wrapper.find('div').at(5).text()).toEqual('Accepted');
  });

  test('Cancelled prayer request notification renders', () => {
    const acceptPrayerRequest = sinon.spy();
    const wrapper = mountWithTheme(
      <ActionableNotification
        notification={
          {
            type: 'ACTIONABLE_NOTIFICATION',
            notificationType: 'PRAYER_REQUEST',
            id: '12345',
            user: yablby,
            timestamp: '9:33pm',
            active: false,
            cancelled: true,
            prayerChannel: 'direct-chat-1234',
          }
        }
        acceptPrayerRequest={acceptPrayerRequest}
        currentUser={billBogus}
        hostChannel={hostChannel.id}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual(
      'notification'
    );
    expect(wrapper.find('span').at(0).props().className).toEqual('icon');
    expect(wrapper.find('div').at(3).text()).toEqual(
      'yablby has requested prayer'
    );
    expect(wrapper.find('div').at(4).text()).toEqual('9:33pm');
    expect(wrapper.find('div').at(5).text()).toEqual('Cancelled');
  });
});
