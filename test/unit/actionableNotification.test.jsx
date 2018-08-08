// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import sinon from 'sinon';

import ActionableNotification from '../../src/moment/actionableNotification/actionableNotification';

Enzyme.configure({ adapter: new Adapter() });

const yablby = {
  pubnubToken: '12345',
  name: 'yablby',
  role: { label: '' },
};
const billBogus = {
  pubnubToken: '5483',
  name: 'Bill Bogus',
  role: { label: '' },
};

describe('ActionableNotification tests', () => {
  test('Active prayer request notification renders', () => {
    const acceptPrayerRequest = sinon.spy();
    const publishPrayerNotification = sinon.spy();
    const wrapper = Enzyme.shallow(
      <ActionableNotification
        notification={
          {
            type: 'ACTIONABLE_NOTIFICATION',
            notificationType: 'PRAYER_REQUEST',
            id: '12345',
            user: yablby,
            timeStamp: '9:33pm',
            active: true,
          }
        }
        acceptPrayerRequest={acceptPrayerRequest}
        currentUser={billBogus}
        publishPrayerNotification={publishPrayerNotification}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual(
      'actionableNotification'
    );
    expect(wrapper.find('span').at(0).props().className).toEqual('icon');
    expect(wrapper.find('div').at(2).text()).toEqual(
      'yablby has requested prayer'
    );
    expect(wrapper.find('div').at(3).text()).toEqual('9:33pm');
    expect(wrapper.find('button').at(0).text()).toEqual('Accept');
    wrapper.find('button').at(0).simulate('click');
    expect(acceptPrayerRequest.calledOnce).toEqual(true);
    expect(publishPrayerNotification.calledOnce).toEqual(true);
  });

  test('Inactive prayer request notification renders', () => {
    const wrapper = Enzyme.shallow(
      <ActionableNotification
        notification={
          {
            type: 'ACTIONABLE_NOTIFICATION',
            notificationType: 'PRAYER_REQUEST',
            id: '12345',
            user: yablby,
            timeStamp: '9:33pm',
            active: false,
          }
        }
        acceptPrayerRequest={() => {}}
        publishPrayerNotification={() => {}}
        currentUser={billBogus}
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
