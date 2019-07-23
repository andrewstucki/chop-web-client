// @flow
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { fireEvent } from '@testing-library/react';
import { createStore } from 'redux';
import { renderWithReduxAndTheme, mountWithTheme } from '../testUtils';

import MomentConnected from '../../src/moment/moment';
import MessageIndex from '../../src/moment/message';
import {
  Message,
  Notification,
  ActionableNotification,
} from '../../src/moment';

import AnchorMoment from '../../src/anchorMoment';
import reducer, { defaultState } from '../../src/chop/dux';
import { Provider } from 'react-redux';
import {newTimestamp} from '../../src/util';

Enzyme.configure({ adapter: new Adapter() });

describe('Moment tests', () => {
  test('Moment renders', () => {
    const store = createStore(
      reducer,
      defaultState
    );
    const wrapper = mountWithTheme(
      <Provider store={store}>
        <MomentConnected
          data={
            {
              type: 'MESSAGE',
              id: '12345',
              text: 'Hello',
              subscriber: {
                id: '54321',
                nickname: 'Wilbur Wagner',
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
      defaultState
    );
    const wrapper = mountWithTheme(
      <Provider store={store}>
        <MomentConnected
          data={
            {
              type: 'MESSAGE',
              id: '12345',
              lang: 'en',
              text: 'Hello',
              subscriber: {
                id: '54321',
                nickname: 'Wilbur Wagner',
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
        subscriber: {
          id: '54321',
          nickname: 'Wilbur Wagner',
        },
        messageTrayOpen: false,
      }
    );
  });

  test('Prayer notification renders', () => {
    const wrapper = mountWithTheme(
      <MomentConnected
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
      <MomentConnected
        data={
          {
            type: 'NOTIFICATION',
            notificationType: 'JOINED_CHANNEL',
            nickname: 'Billy',
            timestamp: '4:53pm',
          }
        }
      />
    );
    expect(wrapper.find(Notification).at(0).props()).toEqual(
      {
        notification: {
          type: 'NOTIFICATION',
          notificationType: 'JOINED_CHANNEL',
          nickname: 'Billy',
          timestamp: '4:53pm',
        },
      }
    );
  });

  test('Left chat notification', () => {
    const wrapper = mountWithTheme(
      <MomentConnected
        data={
          {
            type: 'NOTIFICATION',
            notificationType: 'LEFT_CHAT',
            nickname: 'Billy',
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
          nickname: 'Billy',
          timestamp: '4:53pm',
        },
      }
    );
  });

  test('Prayer request notification renders', () => {
    const store = createStore(
      reducer,
      defaultState
    );
    const wrapper = mountWithTheme(
      <Provider store={store}>
        <MomentConnected
          data={
            {
              type: 'ACTIONABLE_NOTIFICATION',
              notificationType: 'PRAYER_REQUEST',
              subscriber: {
                nickname: 'Billy',
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
          subscriber: {
            nickname: 'Billy',
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
      defaultState
    );
    const wrapper = mountWithTheme(
      <Provider store={store}>
        <MomentConnected
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

  test('Moment renders and toggles', () => {
    const subscriber = {
      id: '123abc',
      nickname: 'guest',
      avatar: null,
      role: {
        label: '',
      },
    };
    const { queryByTestId } = renderWithReduxAndTheme(
      <MessageIndex 
        message={{
          id: '456def',
          timestamp: newTimestamp(),
          subscriber: subscriber,
          type: 'MESSAGE',
          lang: 'en',
          text: 'Hi',
          messageTrayOpen: false,
          isMuted: false,
        }}
        currentChannel='123456'
        isCompact={true}
      />,
      {
        ...defaultState,
        subscriber: {
          ...defaultState.subscriber,
          currentSubscriber: {
            id: '123abc',
            nickname: 'tester joe',
            avatar: null,
            role: {
              label: 'Admin',
              permissions: [
                'feed.direct.create',
                'feed.subscribers.mute',
                'feed.message.delete',
              ],
            },
          },
        },
      }
    );

    expect(queryByTestId('messageContainer')).toBeTruthy;
    expect(queryByTestId('messageContainer-actionable')).toBeTruthy;
    fireEvent.click(queryByTestId('message-actionable'));
    expect(queryByTestId('deleteButton')).toBeTruthy;
    expect(queryByTestId('muteButton')).toBeTruthy;
    expect(queryByTestId('directChatButton')).toBeTruthy;

    fireEvent.click(queryByTestId('muteButton'));
    expect(queryByTestId('muteSubscriber-modal')).toBeTruthy;
  });
});
