// @flow
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import AvatarMoment from '../../src/moment/avatarMoment';
import { Avatar, User } from '../../src/moment/avatarMoment/styles';
import { mountWithTheme } from '../testUtils';

Enzyme.configure({ adapter: new Adapter() });

describe('AvatarMoment tests', () => {
  test('AvatarMoment renders', () => {
    const wrapper = mountWithTheme(
      <AvatarMoment
        avatarMoment={
          {
            type: 'AVATAR_MOMENT',
            id: '12345',
            user: {
              id: 12345,
              avatar: null,
              pubnubToken: '6789',
              name: 'Madmartigan',
              role: { label: '' },
            },
          }
        }
      />
    );

    expect(wrapper.find(Avatar).text()).toEqual('M');
    expect(wrapper.find(User).text()).toEqual('Madmartigan');
  });
});
