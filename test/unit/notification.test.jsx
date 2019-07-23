// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { renderWithReduxAndTheme } from '../testUtils';

import Notification from '../../src/moment/notification';

Enzyme.configure({ adapter: new Adapter() });

describe('Notification test', () => {
  test('Prayer notification renders', () => {
    const { queryByTestId } = renderWithReduxAndTheme(
      <Notification
        notification={
          {
            type: 'NOTIFICATION',
            notificationType: 'PRAYER',
            id: '12345',
            host: 'yablby',
            guest: 'cookietree',
            timestamp: '9:33pm',
          }
        }
        isCompact={true}
      />
    );
    expect(queryByTestId('notification')).toBeTruthy();
    expect(queryByTestId('notification-icon')).toBeTruthy();
    expect(queryByTestId('notification-message').textContent).toEqual(
      'yablby started a live prayer with cookietree9:33pm'
    );
    expect(queryByTestId('notification-timestamp').textContent).toEqual('9:33pm');
  });

  test('Joined chat notification renders', () => {
    const { queryByTestId } = renderWithReduxAndTheme(
      <Notification
        notification={
          {
            type: 'NOTIFICATION',
            notificationType: 'JOINED_CHANNEL',
            id: '12345',
            nickname: 'cookietree',
            timestamp: '9:33pm',
            label: '',
          }
        }
        isCompact={true}
      />
    );
    expect(queryByTestId('notification')).toBeTruthy();
    expect(queryByTestId('notification-icon')).toBeTruthy();
    expect(queryByTestId('notification-message').textContent).toEqual(
      'cookietreejoined_chat.notification9:33pm'
    );
    expect(queryByTestId('notification-timestamp').textContent).toEqual('9:33pm');
  });

  test('Left channel notification renders', () => {
    const { queryByTestId } = renderWithReduxAndTheme(
      <Notification
        notification={
          {
            type: 'NOTIFICATION',
            notificationType: 'LEFT_CHANNEL',
            id: '12345',
            nickname: 'cookietree',
            timestamp: '9:33pm',
            label: '',
          }
        }
        isCompact={true}
      />
    );
    expect(queryByTestId('notification')).toBeTruthy();
    expect(queryByTestId('notification-icon')).toBeTruthy();
    expect(queryByTestId('notification-message').textContent).toEqual(
      'cookietreeleft_chat.notification9:33pm'
    );
    expect(queryByTestId('notification-timestamp').textContent).toEqual('9:33pm');
  });

  test('Mute notification renders with a host', () => {
    const { queryByTestId } = renderWithReduxAndTheme(
      <Notification
        notification={
          {
            type: 'NOTIFICATION',
            notificationType: 'MUTE',
            id: '12345',
            host: 'host',
            guest: 'guest',
            timestamp: '9:33pm',
          }
        }
        isCompact={true}
      />
    );
    expect(queryByTestId('notification')).toBeTruthy();
    expect(queryByTestId('notification-icon')).toBeTruthy();
    expect(queryByTestId('notification-message').textContent).toEqual(
      'host muted guest9:33pm'
    );
    expect(queryByTestId('notification-timestamp').textContent).toEqual('9:33pm');
  });

  test('Mute notification renders without a host', () => {
    const { queryByTestId } = renderWithReduxAndTheme(
      <Notification
        notification={
          {
            type: 'NOTIFICATION',
            notificationType: 'MUTE',
            id: '12345',
            host: '',
            guest: 'guest',
            timestamp: '9:33pm',
          }
        }
        isCompact={true}
      />
    );
    expect(queryByTestId('notification')).toBeTruthy();
    expect(queryByTestId('notification-icon')).toBeTruthy();
    expect(queryByTestId('notification-message').textContent).toEqual(
      'guest was muted9:33pm'
    );
    expect(queryByTestId('notification-timestamp').textContent).toEqual('9:33pm');
  });
});
