// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import sinon from 'sinon';

import ActionableNotification from '../../src/moment/actionableNotification';

Enzyme.configure({ adapter: new Adapter() });

describe('Actionable notification test', () => {
  test('Active prayer request notification renders', () => {
    const acceptPrayerRequest = sinon.spy();
    const wrapper = Enzyme.shallow(
      <ActionableNotification
        notification={
          {
            type: 'ACTIONABLE_NOTIFICATION',
            notificationType: 'PRAYER_REQUEST',
            id: '12345',
            user: {
              id: '12345',
              nickname: 'yablby',
            },
            timeStamp: '9:33pm',
            active: true,
            action: acceptPrayerRequest,
          }
        }
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('actionableNotification');
    expect(wrapper.find('span').at(0).props().className).toEqual('icon');
    expect(wrapper.find('div').at(2).text()).toEqual(
      'yablby has requested prayer'
    );
    expect(wrapper.find('div').at(3).text()).toEqual('9:33pm');
    expect(wrapper.find('button').at(0).text()).toEqual('Accept');
    wrapper.find('button').at(0).simulate('click');
    expect(acceptPrayerRequest.calledOnce).toEqual(true);
  });

  test('Inactive prayer request notification renders', () => {
    const wrapper = Enzyme.shallow(
      <ActionableNotification
        notification={
          {
            type: 'ACTIONABLE_NOTIFICATION',
            notificationType: 'PRAYER_REQUEST',
            id: '12345',
            user: {
              id: '12345',
              nickname: 'yablby',
            },
            timeStamp: '9:33pm',
            active: false,
            action: () => {},
          }
        }
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('notification');
    expect(wrapper.find('span').at(0).props().className).toEqual('icon');
    expect(wrapper.find('div').at(2).text()).toEqual(
      'yablby has requested prayer'
    );
    expect(wrapper.find('div').at(3).text()).toEqual('9:33pm');
    expect(wrapper.find('div').at(4).text()).toEqual('Accepted');
  });
});
