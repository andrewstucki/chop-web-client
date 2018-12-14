// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import sinon from 'sinon';

import PopUpModal from '../../src/popUpModal/popUpModal';

Enzyme.configure({ adapter: new Adapter() });

const otherUser = {
  pubnubToken: '12345',
  name: 'Billy Bob',
  role: {
    label: '',
  },
};
const currentUser = {
  id: '12345',
  pubnubToken: '09876',
  pubnubAccessToken: '67890',
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
        leaveChat={() => {}}
        removeChannel={() => {}}
        currentChannel="direct"
        otherUser={otherUser}
        hasOtherUsers={true}
        currentUser={currentUser}
        isPopUpModalVisible={true}
        publishLeftChannelNotification={() => {}}
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
    const leaveChat = sinon.spy();
    const publishLeftChannelNotification = sinon.spy();
    const removeChannel = sinon.spy();
    const wrapper = Enzyme.shallow(
      <PopUpModal
        togglePopUpModal={togglePopUpModal}
        leaveChat={leaveChat}
        removeChannel={removeChannel}
        currentChannel="direct"
        otherUser={otherUser}
        hasOtherUsers={true}
        currentUser={currentUser}
        isPopUpModalVisible={true}
        publishLeftChannelNotification={publishLeftChannelNotification}
      />
    );
    expect(wrapper.find('button').at(0).simulate('click'));
    expect(wrapper.find('button').at(1).simulate('click'));
    expect(togglePopUpModal.calledTwice).toEqual(true);
    expect(publishLeftChannelNotification.calledOnce).toEqual(true);
    expect(removeChannel.calledOnce).toEqual(true);
  });

  test('Modal does not render if visible is set to false', () => {
    const wrapper = Enzyme.shallow(
      <PopUpModal
        togglePopUpModal={() => {}}
        leaveChat={() => {}}
        removeChannel={() => {}}
        currentChannel="direct"
        otherUser={otherUser}
        hasOtherUsers={true}
        currentUser={currentUser}
        isPopUpModalVisible={false}
        publishLeftChannelNotification={() => {}}
      />
    );
    expect(wrapper.find('div').exists()).toEqual(false);
  });
});
