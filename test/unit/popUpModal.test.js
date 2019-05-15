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
  muteUserType,
} from '../../src/popUpModal/dux';
import PopUpModal from '../../src/popUpModal';
import LeaveChat from '../../src/popUpModal/leaveChat/leaveChat';
import LeaveChatConnected from '../../src/popUpModal/leaveChat';
import MuteUser from '../../src/popUpModal/muteUser/muteUser';
import MuteUserConnected from '../../src/popUpModal/muteUser';
import { renderWithReduxAndTheme } from '../testUtils';


const otherUser = {
  id: 12345,
  pubnubToken: '12345',
  avatar: null,
  name: 'Billy Bob',
  role: {
    label: '',
  },
  preferences: {
    textMode: 'COMPACT',
  },
};

const currentUser = {
  id: 12345,
  pubnubToken: '09876',
  pubnubAccessToken: '67890',
  avatar: null,
  name: 'Joan Jet',
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

  test('Mute user action updates the state', () => {
    const store = createStore(
      reducer,
      {
        feed: {
          ...defaultState,
        },
      }
    );

    store.dispatch(togglePopUpModal(muteUserType('Bob')));

    expect(store.getState().feed.isPopUpModalVisible).toBeTrue();
    expect(store.getState().feed.popUpModal).toEqual({
      type: 'MUTE_USER',
      user: 'Bob',
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
        otherUser={otherUser}
        hasOtherUsers={true}
        currentUser={currentUser}
        publishLeftChannelNotification={publishLeftChannelNotification}
        isPlaceholder={false}
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

  test('Mute user actions can be fired and modal displays', () => {
    const togglePopUpModal = sinon.spy();
    const muteUser = sinon.spy();
    const publishMuteUserNotification = sinon.spy();
    const mutedNotificationBanner = sinon.spy();
    const { getByTestId } = renderWithReduxAndTheme(
      <MuteUser
        togglePopUpModal={togglePopUpModal}
        muteUser={muteUser}
        publishMuteUserNotification={publishMuteUserNotification}
        mutedNotificationBanner={mutedNotificationBanner}
        currentUser={currentUser}
        user={otherUser.name}
        hostChannel='host'
        currentChannel='public'
      />
    );

    expect(getByTestId('muteUser-confirmText').textContent).toEqual(
      'Are you sure you want to mute Billy Bob?'
    );
    expect(getByTestId('muteUser-allMessages').textContent).toEqual(
      'mute_user.all_messages'
    );
    fireEvent.click(getByTestId('muteUser-cancel'));
    fireEvent.click(getByTestId('muteUser-mute'));
    expect(togglePopUpModal.calledTwice).toEqual(true);
    expect(publishMuteUserNotification.calledOnce).toEqual(true);
    expect(muteUser.calledOnce).toEqual(true);
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

  test('Mute user modal displays', () => {
    const state = {
      feed: {
        ...defaultState,
        isPopUpModalVisible: true,
        popUpModal: {
          type: 'MUTE_USER',
          user: 'Billy Bob',
        },
        currentUser,
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
            participants: [
              currentUser,
              otherUser,
            ],
          },
        },
        focusedChannel: '67890',
      },
    };
    const { getByTestId } = renderWithReduxAndTheme(
      <MuteUserConnected
        togglePopUpModal={() => {}}
      />, state
    );
    expect(getByTestId('muteUser-modal')).toBeTruthy();
  });

  test('Leave chat modal displays', () => {
    const state = {
      feed: {
        ...defaultState,
        isPopUpModalVisible: true,
        popUpModal: {
          type: 'LEAVE_CHAT',
        },
        currentUser,
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
            participants: [
              currentUser,
              otherUser,
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
    expect(getByTestId('leaveChat')).toBeTruthy();
  });
});
