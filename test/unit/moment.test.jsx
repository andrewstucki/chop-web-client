// @flow
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Moment from '../../src/moment/moment';
import {
  Message,
  Notification,
  ActionableNotification,
  Text,
  AvatarMoment,
} from '../../src/moment';

import AnchorMoment from '../../src/placeholder/anchorMoment';

Enzyme.configure({ adapter: new Adapter() });

describe('Moment tests', () => {
  test('Moment renders', () => {
    const wrapper = Enzyme.shallow(
      <Moment
        data={
          {
            type: 'MESSAGE',
            id: '12345',
            text: 'Hello',
            user: {
              id: '54321',
              nickname: 'Wilbur Wagner',
            },
            messageTrayOpen: false,
            closeTrayButtonRendered: false,
          }
        }
      />
    );
    expect(wrapper.find(Message).length).toBe(1);
  });

  test('Message renders', () => {
    const wrapper = Enzyme.shallow(
      <Moment
        data={
          {
            type: 'MESSAGE',
            id: '12345',
            text: 'Hello',
            user: {
              id: '54321',
              nickname: 'Wilbur Wagner',
            },
            messageTrayOpen: false,
            closeTrayButtonRendered: false,
          }
        }
      />
    );
    expect(wrapper.find(Message).at(0).props().message).toEqual(
      {
        type: 'MESSAGE',
        id: '12345',
        text: 'Hello',
        user: {
          id: '54321',
          nickname: 'Wilbur Wagner',
        },
        messageTrayOpen: false,
        closeTrayButtonRendered: false,
      }
    );
  });

  test('Prayer notification renders', () => {
    const wrapper = Enzyme.shallow(
      <Moment
        data={
          {
            type: 'NOTIFICATION',
            notificationType: 'PRAYER',
            host: 'Billy',
            guest: 'Bobby',
            timeStamp: '4:53pm',
          }
        }
      />
    );
    expect(wrapper.find(Notification).at(0).props()).toEqual(
      {
        notification: {
          type: 'NOTIFICATION',
          notificationType: 'PRAYER',
          host: 'Billy',
          guest: 'Bobby',
          timeStamp: '4:53pm',
        },
      }
    );
  });

  test('Joined chat notification renders', () => {
    const wrapper = Enzyme.shallow(
      <Moment
        data={
          {
            type: 'NOTIFICATION',
            notificationType: 'JOINED_CHAT',
            name: 'Billy',
            timeStamp: '4:53pm',
          }
        }
      />
    );
    expect(wrapper.find(Notification).at(0).props()).toEqual(
      {
        notification: {
          type: 'NOTIFICATION',
          notificationType: 'JOINED_CHAT',
          name: 'Billy',
          timeStamp: '4:53pm',
        },
      }
    );
  });

  test('Left chat notification', () => {
    const wrapper = Enzyme.shallow(
      <Moment
        data={
          {
            type: 'NOTIFICATION',
            notificationType: 'LEFT_CHAT',
            name: 'Billy',
            timeStamp: '4:53pm',
          }
        }
      />
    );
    expect(wrapper.find(Notification).at(0).props()).toEqual(
      {
        notification: {
          type: 'NOTIFICATION',
          notificationType: 'LEFT_CHAT',
          name: 'Billy',
          timeStamp: '4:53pm',
        },
      }
    );
  });

  test('Prayer request notification renders', () => {
    const wrapper = Enzyme.shallow(
      <Moment
        data={
          {
            type: 'ACTIONABLE_NOTIFICATION',
            notificationType: 'PRAYER_REQUEST',
            name: 'Billy',
            timeStamp: '4:53pm',
            active: true,
          }
        }
      />
    );
    expect(wrapper.find(ActionableNotification).at(0).props()).toEqual(
      {
        notification: {
          type: 'ACTIONABLE_NOTIFICATION',
          notificationType: 'PRAYER_REQUEST',
          name: 'Billy',
          timeStamp: '4:53pm',
          active: true,
        },
      }
    );
  });

  test('Salvation anchor moment renders', () => {
    const wrapper = Enzyme.shallow(
      <Moment
        data={
          {
            type: 'ANCHOR_MOMENT',
            id: '12345',
            text: 'I commit my life to Christ',
            subText: '1 hand raised',
          }
        }
      />
    );
    expect(wrapper.find(AnchorMoment).at(0).props()).toEqual(
      {
        anchorMoment: {
          type: 'ANCHOR_MOMENT',
          id: '12345',
          text: 'I commit my life to Christ',
          subText: '1 hand raised',
        },
        anchorMomentAnchored: false,
      }
    );
  });

  test('Text renders', () => {
    const wrapper = Enzyme.shallow(
      <Moment
        data={
          {
            type: 'BASIC_TEXT',
            text: 'Chat request pending',
          }
        }
      />
    );
    expect(wrapper.find(Text).at(0).props()).toEqual(
      {
        text: {
          type: 'BASIC_TEXT',
          text: 'Chat request pending',
        },
      }
    );
  });

  test('AvatarMoment renders', () => {
    const wrapper = Enzyme.shallow(
      <Moment
        data={
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
    expect(wrapper.find(AvatarMoment).at(0).props()).toEqual(
      {
        avatarMoment: {
          type: 'AVATAR_MOMENT',
          id: '12345',
          user: {
            id: '6789',
            nickname: 'Madmartigan',
          },
        },
      }
    );
  });
});
