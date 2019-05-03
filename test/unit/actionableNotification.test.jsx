// @flow
import React from 'react';
import sinon from 'sinon';
import ActionableNotification from '../../src/moment/actionableNotification/actionableNotification';
import { renderWithTheme } from '../testUtils';
import { fireEvent } from 'react-testing-library';

const yablby = {
  id: 12345,
  pubnubToken: '12345',
  avatar: null,
  name: 'yablby',
  role: { label: '' },
};
const billBogus = {
  id: 12345,
  pubnubToken: '5483',
  avatar: null,
  name: 'Bill Bogus',
  role: { label: '' },
};
const hostChannel = {
  id: 'host',
  name: 'Host',
  moments: [],
  participants: [],
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
            user: yablby,
            timestamp: '9:33pm',
            active: true,
            cancelled: false,
            prayerChannel: 'direct-chat-1234',
          }
        }
        acceptPrayerRequest={acceptPrayerRequest}
        currentUser={billBogus}
        hostChannel={hostChannel.id}
      />
    );
    expect(getByTestId('actionableNotification')).toBeTruthy();
    expect(getByTestId('actionableNotification-text').textContent).toEqual('yablby has requested prayer');
    expect(getByTestId('actionableNotification-timestamp').textContent).toEqual('9:33pm');
    expect(getByTestId('actionableNotification-accept').textContent).toEqual('actionable.accept');
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
            user: yablby,
            timestamp: '9:33pm',
            active: false,
            cancelled: false,
            prayerChannel: 'direct-chat-12345',
          }
        }
        acceptPrayerRequest={() => {}}
        publishPrayerNotification={() => {}}
        currentUser={billBogus}
        hostChannel={hostChannel.id}
      />
    );
    expect(queryByTestId('actionableNotificiation-accept')).toBeNull();
    expect(getByTestId('actionableNotification-accepted').textContent).toEqual('actionable.accepted');
  });

  test('Cancelled prayer request notification renders', () => {
    const acceptPrayerRequest = sinon.spy();
    const { getByTestId, queryByTestId } = renderWithTheme(
      <ActionableNotification
        notification={
          {
            type: 'ACTIONABLE_NOTIFICATION',
            notificationType: 'PRAYER_REQUEST',
            id: '12345',
            user: yablby,
            timestamp: '9:33pm',
            active: false,
            cancelled: true,
            prayerChannel: 'direct-chat-1234',
          }
        }
        acceptPrayerRequest={acceptPrayerRequest}
        currentUser={billBogus}
        hostChannel={hostChannel.id}
      />
    );

    expect(queryByTestId('actionableNotificiation-accept')).toBeNull();
    expect(getByTestId('actionableNotification-accepted').textContent).toEqual('actionable.cancelled');
  });
});
