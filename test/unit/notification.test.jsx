// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

import Notification from '../../src/moment/notification';

Enzyme.configure({ adapter: new Adapter() });

describe('Notification test', () => {
  test('Notification renders', () => {
    const wrapper = Enzyme.shallow(
      <Notification
        text="@yablby started a direct chat with @cookietree"
        timeStamp="9:33pm"
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('notification');
    expect(wrapper.find('span').at(0).props().className).toEqual('icon');
    expect(wrapper.find('div').at(1).text()).toEqual(
      'Yablby started a direct chat with Cookietree'
    );
    expect(wrapper.find('div').at(2).text()).toEqual('9:33pm');
  });
});
