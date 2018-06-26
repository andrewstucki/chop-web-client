// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

import ActionableNotification from '../../src/moment/actionableNotification';

Enzyme.configure({ adapter: new Adapter() });

describe('Actionable notification test', () => {
  test('Prayer notification renders', () => {
    const wrapper = Enzyme.shallow(
      <ActionableNotification
        notification={
          {
            type: 'ACTIONABLE_NOTIFICATION',
            notificationType: 'PRAYER_REQUEST',
            name: 'yablby',
            timeStamp: '9:33pm',
            active: true,
          }
        }
      />
    );
    expect(wrapper.find('div').at(1).props().className).toEqual('notification');
    expect(wrapper.find('span').at(0).props().className).toEqual('icon');
    expect(wrapper.find('div').at(3).text()).toEqual(
      'yablby has requested prayer'
    );
    expect(wrapper.find('div').at(4).text()).toEqual('9:33pm');
    expect(wrapper.find('button').at(0).text()).toEqual('Accept');
  });
});
