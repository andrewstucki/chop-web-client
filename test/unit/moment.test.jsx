// @flow
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Moment from '../../src/moment/moment';
import {
  Message,
  Notification,
  ActionableNotification,
} from '../../src/moment';
import { mountWithTheme } from '../testUtils';

import AnchorMoment from '../../src/anchorMoment';
import { createStore } from 'redux';
import reducer from '../../src/chop/dux';
import { defaultState } from '../../src/feed/dux';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

describe('Moment tests', () => {
  test('Moment renders', () => {
    const store = createStore(
      reducer,
      {
        feed: defaultState,
      }
    );
    const wrapper = mountWithTheme(
      <Provider store={store}>
        <Moment
          data={
            {
              type: 'MESSAGE',
              id: '12345',
              text: 'Hello',
              sender: {
                id: '54321',
                name: 'Wilbur Wagner',
              },
              messageTrayOpen: false,
            }
          }
        />
      </Provider>
    );
    expect(wrapper.find(Message).length).toBe(1);
  });

  test('Message renders', () => {
    const store = createStore(
      reducer,
      {
        feed: defaultState,
      }
    );
    const wrapper = mountWithTheme(
      <Provider store={store}>
        <Moment
          data={
            {
              type: 'MESSAGE',
              id: '12345',
              lang: 'en',
              text: 'Hello',
              sender: {
                id: '54321',
                name: 'Wilbur Wagner',
              },
              messageTrayOpen: false,
            }
          }
        />
      </Provider>
    );
    expect(wrapper.find(Message).at(0).props().message).toEqual(
      {
        type: 'MESSAGE',
        id: '12345',
        lang: 'en',
        text: 'Hello',
        sender: {
          id: '54321',
          name: 'Wilbur Wagner',
        },
        messageTrayOpen: false,
      }
    );
  });

  test('Prayer notification renders', () => {
    const wrapper = mountWithTheme(
      <Moment
        data={
          {
            type: 'NOTIFICATION',
            notificationType: 'PRAYER',
            host: 'Billy',
            guest: 'Bobby',
            timestamp: '4:53pm',
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
          timestamp: '4:53pm',
        },
      }
    );
  });

  test('Joined chat notification renders', () => {
    const wrapper = mountWithTheme(
      <Moment
        data={
          {
            type: 'NOTIFICATION',
            notificationType: 'JOINED_CHAT',
            name: 'Billy',
            timestamp: '4:53pm',
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
          timestamp: '4:53pm',
        },
      }
    );
  });

  test('Left chat notification', () => {
    const wrapper = mountWithTheme(
      <Moment
        data={
          {
            type: 'NOTIFICATION',
            notificationType: 'LEFT_CHAT',
            name: 'Billy',
            timestamp: '4:53pm',
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
          timestamp: '4:53pm',
        },
      }
    );
  });

  test('Prayer request notification renders', () => {
    const store = createStore(
      reducer,
      {
        feed: defaultState,
      }
    );
    const wrapper = mountWithTheme(
      <Provider store={store}>
        <Moment
          data={
            {
              type: 'ACTIONABLE_NOTIFICATION',
              notificationType: 'PRAYER_REQUEST',
              user: {
                name: 'Billy',
              },
              timestamp: '4:53pm',
              active: true,
            }
          }
        />
      </Provider>
    );
    expect(wrapper.find(ActionableNotification).at(0).props()).toEqual(
      {
        notification: {
          type: 'ACTIONABLE_NOTIFICATION',
          notificationType: 'PRAYER_REQUEST',
          user: {
            name: 'Billy',
          },
          timestamp: '4:53pm',
          active: true,
        },
      }
    );
  });

  test('Salvation anchor moment renders', () => {
    const store = createStore(
      reducer,
      {
        feed: defaultState,
      }
    );
    const wrapper = mountWithTheme(
      <Provider store={store}>
        <Moment
          data={
            {
              type: 'ANCHOR_MOMENT',
              anchorMomentType: 'SALVATION',
              id: '12345',
            }
          }
          isAnchorMomentAnchored={false}
        />
      </Provider>
    );
    expect(wrapper.find(AnchorMoment).at(0).props()).toEqual(
      {
        anchorMoment: {
          type: 'ANCHOR_MOMENT',
          anchorMomentType: 'SALVATION',
          id: '12345',
        },
        isAnchorMomentAnchored: false,
      }
    );
  });
});
