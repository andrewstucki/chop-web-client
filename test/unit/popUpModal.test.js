// @flow
import React from 'react';
import sinon from 'sinon';
import { fireEvent } from '@testing-library/react';
import { createStore } from 'redux';
import reducer, { defaultState as defaultChopState } from '../../src/chop/dux';
import { defaultState } from '../../src/feed/dux';
import { togglePopUpModal } from '../../src/popUpModal/dux';
import { leaveChatType } from '../../src/popUpModal/leaveChat/dux';
import { muteSubscriberType } from '../../src/popUpModal/muteSubscriber/dux';
import PopUpModal from '../../src/popUpModal';
import LeaveChat from '../../src/popUpModal/leaveChat/leaveChat';
import LeaveChatConnected from '../../src/popUpModal/leaveChat';
import MuteSubscriber from '../../src/popUpModal/muteSubscriber/muteSubscriber';
import MuteSubscriberConnected from '../../src/popUpModal/muteSubscriber';
import LoginConnected from '../../src/popUpModal/login';
import GuestNicknameConnected from '../../src/popUpModal/guestNickname';
import { renderWithReduxAndTheme } from '../testUtils';
import RemoveAvatarPopUpModal from '../../src/popUpModal/removeAvatar/removeAvatar';
import DeleteAccountPopUpModal from '../../src/popUpModal/deleteAccount/deleteAccount';
import ConnectedDeleteAccountPopUpModal from '../../src/popUpModal/deleteAccount';
import ConnectedRemoveAvatarPopUpModal from '../../src/popUpModal/removeAvatar';
import { PROFILE_SETTINGS } from '../../src/popUpModal/profileSettings/dux';

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
  firstName: 'Joan',
  lastName: 'Jet',
  email: 'joanjet@blackhearts.rock',
  phoneNumber: '',
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

    store.dispatch(togglePopUpModal(muteSubscriberType('Bob', 'public')));

    expect(store.getState().feed.isPopUpModalVisible).toBeTrue();
    expect(store.getState().feed.popUpModal).toEqual({
      type: 'MUTE_SUBSCRIBER',
      subscriber: 'Bob',
      channelId: 'public',
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

  test('Remove avatar actions can be fired and modal displays', () => {
    const removeAvatar = sinon.spy();
    const togglePopUpModal = sinon.spy();
    const { getByTestId } = renderWithReduxAndTheme(
      <RemoveAvatarPopUpModal
        currentSubscriberId='12345'
        removeAvatar={removeAvatar}
        togglePopUpModal={togglePopUpModal}
        isSmall={false}
      />
    );
    expect(getByTestId('removeAvatar-confirmText').textContent).toEqual(
      'remove_avatar.message'
    );
    fireEvent.click(getByTestId('removeAvatar-cancel'));
    expect(togglePopUpModal.calledOnce).toBeTrue();
    fireEvent.click(getByTestId('removeAvatar-confirm'));
    expect(removeAvatar.calledOnce).toBeTrue();
    expect(removeAvatar.calledWith('12345')).toBeTrue();
  });

  test('Delete account actions can be fired and modal displays', () => {
    const deleteAccount = sinon.spy();
    const togglePopUpModal = sinon.spy();
    const { getByTestId } = renderWithReduxAndTheme(
      <DeleteAccountPopUpModal
        currentSubscriberId='12345'
        deleteAccount={deleteAccount}
        togglePopUpModal={togglePopUpModal}
        isSmall={false}
      />
    );

    expect(getByTestId('deleteAccount-confirmText').textContent).toEqual(
      'delete_account.message'
    );

    fireEvent.click(getByTestId('deleteAccount-cancel'));
    expect(togglePopUpModal.calledOnce).toBeTrue();
    fireEvent.click(getByTestId('deleteAccount-confirm'));
    expect(deleteAccount.calledOnce).toBeTrue();
  });

  test('Mute subscriber actions can be fired and modal displays', () => {
    const togglePopUpModal = sinon.spy();
    const muteSubscriber = sinon.spy();
    const publishMuteSubscriberNotification = sinon.spy();
    const mutedBanner = sinon.spy();
    const { getByTestId } = renderWithReduxAndTheme(
      <MuteSubscriber
        togglePopUpModal={togglePopUpModal}
        muteSubscriber={muteSubscriber}
        publishMuteSubscriberNotification={publishMuteSubscriberNotification}
        mutedBanner={mutedBanner}
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
    expect(mutedBanner.calledOnce).toEqual(true);
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

  test('Login modal displays', () => {
    const state = {
      feed: {
        ...defaultState,
        isPopUpModalVisible: true,
        popUpModal: {
          type: 'LOGIN',
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
      <LoginConnected
        togglePopUpModal={() => {}}
      />, state
    );
    expect(getByTestId('login-modal')).toBeTruthy();
    expect(getByTestId('login-modal')).toBeTruthy();
  });

  test('Guest nickname modal displays', () => {
    const state = {
      feed: {
        ...defaultState,
        isPopUpModalVisible: true,
        popUpModal: {
          type: 'GUEST_NICKNAME',
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
      <GuestNicknameConnected
        togglePopUpModal={() => {}}
      />, state
    );
    expect(getByTestId('guestNickname-modal')).toBeTruthy();
  });

  test('Delete account modal displays', () => {
    const state = {
      feed: {
        ...defaultState,
        isPopUpModalVisible: true,
        popUpModal: {
          type: 'DELETE_ACCOUNT',
        },
      },
    };
    const { getByTestId, store } = renderWithReduxAndTheme(
      <ConnectedDeleteAccountPopUpModal/>, state
    );
    expect(getByTestId('deleteAccount-modal')).toBeTruthy();
    fireEvent.click(getByTestId('deleteAccount-confirm'));
    expect(store.getState().feed.popUpModal).toEqual({});
  });

  test('Remove avatar modal displays', () => {
    const state = {
      feed: {
        ...defaultState,
        isPopUpModalVisible: true,
        popUpModal: {
          type: 'REMOVE_AVATAR',
        },
      },
    };
    const { getByTestId, store } = renderWithReduxAndTheme(
      <ConnectedRemoveAvatarPopUpModal/>, state
    );
    expect(getByTestId('removeAvatar-modal')).toBeTruthy();
    fireEvent.click(getByTestId('removeAvatar-confirm'));
    expect(store.getState().feed.isPopUpModalVisible).toBeTrue();
    expect(store.getState().feed.popUpModal).toEqual({ type: PROFILE_SETTINGS });
  });
});
