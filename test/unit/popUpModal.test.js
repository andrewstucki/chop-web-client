// @flow
import React from 'react';
import sinon from 'sinon';
import { fireEvent } from 'react-testing-library';
import { createStore } from 'redux';
import reducer, { defaultState as defaultChopState } from '../../src/chop/dux';
import { defaultState } from '../../src/feed/dux';
import {
  togglePopUpModal,
  leaveChatType,
  muteSubscriberType,
} from '../../src/popUpModal/dux';
import PopUpModal from '../../src/popUpModal';
import LeaveChat from '../../src/popUpModal/leaveChat/leaveChat';
import LeaveChatConnected from '../../src/popUpModal/leaveChat';
import MuteSubscriber from '../../src/popUpModal/muteSubscriber/muteSubscriber';
import MuteSubscriberConnected from '../../src/popUpModal/muteSubscriber';
import { renderWithReduxAndTheme } from '../testUtils';


const otherSubscriber = {
  id: '12345',
  avatar: null,
  nickname: 'Billy Bob',
  role: {
    label: '',
  },
};

const currentSubscriber = {
  id: '12345',
  pubnubAccessKey: '67890',
  avatar: null,
  nickname: 'Joan Jet',
  role: {
    label: '',
    permissions: [],
  },
  preferences: {
    textMode: 'COMPACT',
  },
};

describe('PopUpModal tests', () => {
  test('Leave chat action updates the state', () => {
    const store = createStore(
      reducer,
      {
        feed: {
          ...defaultState,
        },
      }
    );

    store.dispatch(togglePopUpModal(leaveChatType()));

    expect(store.getState().feed.isPopUpModalVisible).toBeTrue();
    expect(store.getState().feed.popUpModal).toEqual({
      type: 'LEAVE_CHAT',
    });
  });

  test('Mute subscriber action updates the state', () => {
    const store = createStore(
      reducer,
      {
        feed: {
          ...defaultState,
        },
      }
    );

    store.dispatch(togglePopUpModal(muteSubscriberType('Bob')));

    expect(store.getState().feed.isPopUpModalVisible).toBeTrue();
    expect(store.getState().feed.popUpModal).toEqual({
      type: 'MUTE_SUBSCRIBER',
      subscriber: 'Bob',
    });
  });

  test('Leave chat actions can be fired and modal displays', () => {
    const togglePopUpModal = sinon.spy();
    const leaveChannel = sinon.spy();
    const publishLeftChannelNotification = sinon.spy();
    const { getByTestId } = renderWithReduxAndTheme(
      <LeaveChat
        togglePopUpModal={togglePopUpModal}
        leaveChannel={leaveChannel}
        currentChannel="direct"
        otherSubscriber={otherSubscriber}
        hasOtherSubscribers={true}
        currentSubscriber={currentSubscriber}
        publishLeftChannelNotification={publishLeftChannelNotification}
        isPlaceholder={false}
        isSmall={false}
      />
    );

    expect(getByTestId('leaveChat-confirmText').textContent).toEqual(
      'Are you sure you want to end your chat with Billy Bob?'
    );
    fireEvent.click(getByTestId('leaveChat-keepChatting'));
    fireEvent.click(getByTestId('leaveChat-leaveButton'));
    expect(togglePopUpModal.calledTwice).toEqual(true);
    expect(publishLeftChannelNotification.calledOnce).toEqual(true);
    expect(leaveChannel.calledOnce).toEqual(true);
  });

  test('Mute subscriber actions can be fired and modal displays', () => {
    const togglePopUpModal = sinon.spy();
    const muteSubscriber = sinon.spy();
    const publishMuteSubscriberNotification = sinon.spy();
    const mutedNotificationBanner = sinon.spy();
    const { getByTestId } = renderWithReduxAndTheme(
      <MuteSubscriber
        togglePopUpModal={togglePopUpModal}
        muteSubscriber={muteSubscriber}
        publishMuteSubscriberNotification={publishMuteSubscriberNotification}
        mutedNotificationBanner={mutedNotificationBanner}
        currentSubscriber={currentSubscriber.nickname}
        subscriber={otherSubscriber.nickname}
        hostChannel='host'
        channelId='public'
        isSmall={false}
      />
    );

    expect(getByTestId('muteSubscriber-confirmText').textContent).toEqual(
      'Are you sure you want to mute Billy Bob?mute_subscriber.all_messages'
    );
    expect(getByTestId('muteSubscriber-allMessages').textContent).toEqual(
      'mute_subscriber.all_messages'
    );
    fireEvent.click(getByTestId('muteSubscriber-cancel'));
    fireEvent.click(getByTestId('muteSubscriber-mute'));
    expect(togglePopUpModal.calledTwice).toEqual(true);
    expect(publishMuteSubscriberNotification.calledOnce).toEqual(true);
    expect(muteSubscriber.calledOnce).toEqual(true);
    expect(mutedNotificationBanner.calledOnce).toEqual(true);
  });

  test('Modal has background', () => {
    const { queryByTestId } = renderWithReduxAndTheme(
      <PopUpModal />,
      {
        ...defaultChopState,
        feed: {
          ...defaultChopState.feed,
          isPopUpModalVisible: true,
          popUpModal: {
            type: 'LEAVE_CHAT',
          },
        },
      }
    );
    expect(queryByTestId('popUpModal')).toBeTruthy();
  });

  test('Modal does not render if visible is set to false', () => {
    const { queryByTestId } = renderWithReduxAndTheme(
      <PopUpModal />,
      {
        ...defaultChopState,
        feed: {
          ...defaultChopState.feed,
          isPopUpModalVisible: false,
          popUpModal: {
            type: '',
          },
        },
      }
    );
    expect(queryByTestId('popUpModal')).toBeFalsy();
  });

  test('Mute subscriber modal displays', () => {
    const state = {
      feed: {
        ...defaultState,
        isPopUpModalVisible: true,
        popUpModal: {
          type: 'MUTE_SUBSCRIBER',
          subscriber: 'Billy Bob',
        },
        currentSubscriber,
        channels: {
          host: {
            id: 'Host',
            name: 'host',
            moments: [],
            anchorMoments: [],
          },
          '67890': {
            id: '67890',
            name: 'direct',
            moments: [],
            anchorMoments: [],
            subscribers: [
              currentSubscriber,
              otherSubscriber,
            ],
          },
        },
        focusedChannel: '67890',
      },
    };
    const { getByTestId } = renderWithReduxAndTheme(
      <MuteSubscriberConnected
        togglePopUpModal={() => {}}
      />, state
    );
    expect(getByTestId('muteSubscriber-modal')).toBeTruthy();
  });

  test('Leave chat modal displays', () => {
    const state = {
      feed: {
        ...defaultState,
        isPopUpModalVisible: true,
        popUpModal: {
          type: 'LEAVE_CHAT',
        },
        currentSubscriber,
        channels: {
          host: {
            id: 'Host',
            name: 'host',
            moments: [],
            anchorMoments: [],
          },
          '67890': {
            id: '67890',
            name: 'direct',
            moments: [],
            anchorMoments: [],
            subscribers: [
              currentSubscriber,
              otherSubscriber,
            ],
          },
        },
        focusedChannel: '67890',
      },
    };
    const { getByTestId } = renderWithReduxAndTheme(
      <LeaveChatConnected
        togglePopUpModal={() => {}}
      />, state
    );
    expect(getByTestId('leaveChat-modal')).toBeTruthy();
  });
});
