// @flow
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import Moment from '../../src/moment/moment';
import { Message, Notification, ActionableNotification, createMessage } from '../../src/moment';
import {
  formatAMPM,
  publishPrayerNotification,
  publishJoinedChatNotification,
  publishLeftChatNotification,
} from '../../src/moment/notification/dux';

import {
  publishPrayerRequestNotification,
} from '../../src/moment/actionableNotification/dux';

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

  test('Prayer notification renders', () => {
    const wrapper = Enzyme.shallow(
      <Moment
        data={
          publishPrayerNotification('Billy', 'Bobby')
        }
      />
    );
    expect(wrapper.find(Notification).at(0).props().notification).toEqual(
      {
        type: 'NOTIFICATION',
        notificationType: 'PRAYER',
        host: 'Billy',
        guest: 'Bobby',
        timeStamp: formatAMPM(new Date),
      }
    );
  });

  test('Joined chat notification renders public', () => {
    const wrapper = Enzyme.shallow(
      <Moment
        data={
          publishJoinedChatNotification('Billy', 'public')
        }
      />
    );
    expect(wrapper.find(Notification).at(0).props().notification).toEqual(
      {
        type: 'NOTIFICATION',
        notificationType: 'JOINED_CHAT',
        name: 'Billy',
        timeStamp: formatAMPM(new Date),
      }
    );
  });

  test('Joined chat notification renders host', () => {
    const wrapper = Enzyme.shallow(
      <Moment
        data={
          publishJoinedChatNotification('Billy', 'host')
        }
      />
    );
    expect(wrapper.find(Notification).at(0).props().notification).toEqual(
      {
        type: 'NOTIFICATION',
        notificationType: 'JOINED_CHAT',
        name: 'Billy',
        timeStamp: formatAMPM(new Date),
      }
    );
  });

  test('Left chat notification renders public', () => {
    const wrapper = Enzyme.shallow(
      <Moment
        data={
          publishLeftChatNotification('Billy', 'public')
        }
      />
    );
    expect(wrapper.find(Notification).at(0).props().notification).toEqual(
      {
        type: 'NOTIFICATION',
        notificationType: 'LEFT_CHAT',
        name: 'Billy',
        timeStamp: formatAMPM(new Date),
      }
    );
  });

  test('Left chat notification renders host', () => {
    const wrapper = Enzyme.shallow(
      <Moment
        data={
          publishLeftChatNotification('Billy', 'host')
        }
      />
    );
    expect(wrapper.find(Notification).at(0).props().notification).toEqual(
      {
        type: 'NOTIFICATION',
        notificationType: 'LEFT_CHAT',
        name: 'Billy',
        timeStamp: formatAMPM(new Date),
      }
    );
  });

  test('Prayer request notification renders', () => {
    const wrapper = Enzyme.shallow(
      <Moment
        data={
          publishPrayerRequestNotification('Billy')
        }
      />
    );
    expect(wrapper.find(ActionableNotification).at(0).props().notification).toEqual(
      {
        type: 'ACTIONABLE_NOTIFICATION',
        notificationType: 'PRAYER_REQUEST',
        name: 'Billy',
        timeStamp: formatAMPM(new Date),
      }
    );
  });
});
