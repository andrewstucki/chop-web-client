// @flow
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AvatarMoment from '../../src/moment/avatarMoment';

Enzyme.configure({ adapter: new Adapter() });

describe('AvatarMoment tests', () => {
  test('AvatarMoment renders', () => {
    const wrapper = Enzyme.shallow(
      <AvatarMoment
        avatarMoment={
          {
            type: 'AVATAR_MOMENT',
            id: '12345',
            user: {
              id: '6789',
              nickname: 'Madmartigan',
            },
          }
        }
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('avatarMoment');
    expect(wrapper.find('div').at(1).text()).toEqual('M');
    expect(wrapper.find('div').at(2).text()).toEqual('Madmartigan');
  });
});
