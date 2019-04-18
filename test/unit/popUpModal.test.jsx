// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import sinon from 'sinon';

import PopUpModal from '../../src/popUpModal/popUpModal';

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
  pubnubAccessKey: '67890',
  avatar: null,
  name: 'Joan Jet',
  role: {
    label: '',
    permissions: [],
  },
};

describe('PopUpModal tests', () => {
  test('Modal has background and popup', () => {
    const wrapper = Enzyme.shallow(
      <PopUpModal
        togglePopUpModal={() => {}}
        leaveChannel={() => {}}
        currentChannel="direct"
        otherUser={otherUser}
        hasOtherUsers={true}
        currentUser={currentUser}
        isPopUpModalVisible={true}
        publishLeftChannelNotification={() => {}}
        isPlaceholder={false}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('popUpModal');
    expect(wrapper.find('div').at(1).props().className).toEqual('alert');
    expect(wrapper.find('div').at(2).text()).toEqual(
      'Are you sure you want to end your chat with Billy Bob?'
    );
  });

  test('Actions can be fired', () => {
    const togglePopUpModal = sinon.spy();
    const publishLeftChannelNotification = sinon.spy();
    const leaveChannel = sinon.spy();
    const wrapper = Enzyme.shallow(
      <PopUpModal
        togglePopUpModal={togglePopUpModal}
        leaveChannel={leaveChannel}
        currentChannel="direct"
        otherUser={otherUser}
        hasOtherUsers={true}
        currentUser={currentUser}
        isPopUpModalVisible={true}
        publishLeftChannelNotification={publishLeftChannelNotification}
        isPlaceholder={false}
      />
    );
    expect(wrapper.find('button').at(0).simulate('click'));
    expect(wrapper.find('button').at(1).simulate('click'));
    expect(togglePopUpModal.calledTwice).toEqual(true);
    expect(publishLeftChannelNotification.calledOnce).toEqual(true);
    expect(leaveChannel.calledOnce).toEqual(true);
  });

  test('Modal does not render if visible is set to false', () => {
    const wrapper = Enzyme.shallow(
      <PopUpModal
        togglePopUpModal={() => {}}
        leaveChannel={() => {}}
        currentChannel="direct"
        otherUser={otherUser}
        hasOtherUsers={true}
        currentUser={currentUser}
        isPopUpModalVisible={false}
        publishLeftChannelNotification={() => {}}
        isPlaceholder={false}
      />
    );
    expect(wrapper.find('div').exists()).toEqual(false);
  });
});
