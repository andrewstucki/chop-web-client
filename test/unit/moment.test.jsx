// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Moment from '../../src/moment/moment';
import { Message, Notification, createMessage } from '../../src/moment';

Enzyme.configure({ adapter: new Adapter() });

describe('Moment tests', () => {
  test('Moment renders', () => {
    const wrapper = Enzyme.shallow(
      <Moment
        data={
          createMessage(
            '12345',
            'Hello',
            {
              id: '67890',
              nickname: 'Bob',
            },
            false
          )
        }
      />
    );
    expect(wrapper.find(Message).length).toBe(1);
  });

  test('Message renders', () => {
    const wrapper = Enzyme.shallow(
      <Moment
        data={
          createMessage(
            '12345',
            'Hello',
            {
              id: '67890',
              nickname: 'Bob',
            },
            false
          )
        }
      />
    );
    expect(wrapper.find(Message).at(0).props().message).toEqual(
      {
        type: 'MESSAGE',
        id: '12345',
        text: 'Hello',
        user: {
          id: '67890',
          nickname: 'Bob',
        },
        messageTrayOpen: false,
      }
    );
  });
});
