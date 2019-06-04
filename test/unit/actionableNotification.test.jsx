// @flow
import React from 'react';
import sinon from 'sinon';
import { renderWithTheme } from '../testUtils';
import { fireEvent } from '@testing-library/react';

import ActionableNotification from '../../src/moment/actionableNotification/actionableNotification';

const yablby = {
  id: '12345',
  avatar: null,
  nickname: 'yablby',
  role: { label: '' },
};
const billBogus = {
  id: '12345',
  avatar: null,
  nickname: 'Bill Bogus',
  role: { label: '' },
  preferences: {
    textMode: 'COMPACT',
  },
};
const hostChannel = {
  id: 'host',
  name: 'Host',
  moments: [],
  subscribers: [],
};

describe('ActionableNotification tests', () => {
  test('Active prayer request notification renders', () => {
    const acceptPrayerRequest = sinon.spy();
    const { getByTestId } = renderWithTheme(
      <ActionableNotification
        notification={
          {
            type: 'ACTIONABLE_NOTIFICATION',
            notificationType: 'PRAYER_REQUEST',
            id: '12345',
            subscriber: yablby,
            timestamp: '9:33pm',
            active: true,
            cancelled: false,
            prayerChannel: 'direct-chat-1234',
          }
        }
        acceptPrayerRequest={acceptPrayerRequest}
        currentSubscriber={billBogus}
        hostChannel={hostChannel.id}
        isCompact={true}
      />
    );
    expect(getByTestId('actionableNotification')).toBeTruthy();
    expect(getByTestId('actionableNotification-icon')).toBeTruthy();
    expect(getByTestId('actionableNotification-message').textContent).toEqual(
      'yablby has requested prayer9:33pm'
    );
    expect(getByTestId('actionableNotification-timestamp').textContent).toEqual('9:33pm');
    expect(getByTestId('actionableNotification-accept')).toBeTruthy();
    fireEvent.click(getByTestId('actionableNotification-accept'));
    expect(acceptPrayerRequest.calledOnce).toEqual(true);
  });

  test('Inactive prayer request notification renders', () => {
    const { getByTestId, queryByTestId } = renderWithTheme(
      <ActionableNotification
        notification={
          {
            type: 'ACTIONABLE_NOTIFICATION',
            notificationType: 'PRAYER_REQUEST',
            id: '12345',
            subscriber: yablby,
            timestamp: '9:33pm',
            active: false,
            cancelled: false,
            prayerChannel: 'direct-chat-12345',
          }
        }
        acceptPrayerRequest={() => {}}
        publishPrayerNotification={() => {}}
        currentSubscriber={billBogus}
        hostChannel={hostChannel.id}
        isCompact={true}
      />
    );
    expect(queryByTestId('actionableNotificiation-accept')).toBeNull();
    expect(getByTestId('actionableNotification-accepted').textContent).toEqual('actionable.accepted');
  });

  test('Cancelled prayer request notification renders', () => {
    const acceptPrayerRequest = sinon.spy();
    const { queryByTestId } = renderWithTheme(
      <ActionableNotification
        notification={
          {
            type: 'ACTIONABLE_NOTIFICATION',
            notificationType: 'PRAYER_REQUEST',
            id: '12345',
            subscriber: yablby,
            timestamp: '9:33pm',
            active: false,
            cancelled: true,
            prayerChannel: 'direct-chat-1234',
          }
        }
        acceptPrayerRequest={acceptPrayerRequest}
        currentSubscriber={billBogus}
        hostChannel={hostChannel.id}
        isCompact={true}
      />
    );
    expect(queryByTestId('actionableNotification-accepted').textContent).toEqual('actionable.cancelled');
    expect(queryByTestId('actionableNotificiation-accept')).toBeNull();
  });
});
