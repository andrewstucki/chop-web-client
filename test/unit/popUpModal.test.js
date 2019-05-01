// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import sinon from 'sinon';

import { createStore } from 'redux';
import reducer from '../../src/chop/dux';
import { defaultState } from '../../src/feed/dux';
import {
  togglePopUpModal,
  leaveChatType,
  muteUserType,
} from '../../src/popUpModal/dux';

import PopUpModal from '../../src/popUpModal/popUpModal';
import LeaveChat from '../../src/popUpModal/leaveChat/leaveChat';
import MuteUser from '../../src/popUpModal/muteUser/muteUser';
import MuteUserConnected from '../../src/popUpModal/muteUser';
import LeaveChatConnected from '../../src/popUpModal/leaveChat';
import { renderWithReduxAndTheme } from '../testUtils';

Enzyme.configure({ adapter: new Adapter() });

const otherUser = {
  id: 12345,
  pubnubToken: '12345',
  avatar: null,
  name: 'Billy Bob',
  role: {
    label: '',
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
    const wrapper = Enzyme.shallow(
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
    expect(wrapper.find('div').at(0).props().className).toEqual('alert');
    expect(wrapper.find('div').at(1).text()).toEqual(
      'Are you sure you want to end your chat with Billy Bob?'
    );
    expect(wrapper.find('button').at(0).simulate('click'));
    expect(wrapper.find('button').at(1).simulate('click'));
    expect(togglePopUpModal.calledTwice).toEqual(true);
    expect(publishLeftChannelNotification.calledOnce).toEqual(true);
    expect(leaveChannel.calledOnce).toEqual(true);
  });

  test('Mute user actions can be fired and modal displays', () => {
    const togglePopUpModal = sinon.spy();
    const muteUser = sinon.spy();
    const publishMuteUserNotification = sinon.spy();
    const mutedNotificationBanner = sinon.spy();
    const wrapper = Enzyme.shallow(
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
    expect(wrapper.find('div').at(0).props().className).toEqual('alert');
    expect(wrapper.find('div').at(1).text()).toEqual(
      'Are you sure you want to mute Billy Bob?'
    );
    expect(wrapper.find('div').at(2).text()).toEqual(
      'All of their messages will be deleted.'
    );
    expect(wrapper.find('button').at(0).simulate('click'));
    expect(wrapper.find('button').at(1).simulate('click'));
    expect(togglePopUpModal.calledTwice).toEqual(true);
    expect(publishMuteUserNotification.calledOnce).toEqual(true);
    expect(muteUser.calledOnce).toEqual(true);
    expect(mutedNotificationBanner.calledOnce).toEqual(true);
  });

  test('Modal has background', () => {
    const wrapper = Enzyme.shallow(
      <PopUpModal
        togglePopUpModal={() => {}}
        isPopUpModalVisible={true}
        modal={{
          type: 'LEAVE_CHAT',
        }}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('popUpModal');
  });

  test('Modal does not render if visible is set to false', () => {
    const wrapper = Enzyme.shallow(
      <PopUpModal
        togglePopUpModal={() => {}}
        modal={{}}
        isPopUpModalVisible={false}
      />
    );
    expect(wrapper.find('div').exists()).toEqual(false);
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
    expect(getByTestId('mute-user-modal')).toBeTruthy();
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
    expect(getByTestId('leave-chat-modal')).toBeTruthy();
  });
});
