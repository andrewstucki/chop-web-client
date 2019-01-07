// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PopUpModal from '../src/popUpModal/popUpModal';
import '../assets/global.css';

const otherUser = {
  id: '12345',
  pubnubToken: '12345',
  name: 'Walker, Texas Ranger',
  role: { label: '' },
};
const currentUser = {
  id: '12345',
  pubnubToken: '12345',
  name: 'Jimmy Trivette',
  role: { label: '' },
};

storiesOf('PopUpModal', module)
  .add('Modal renders if isPopUpModalVisible is true', () => (
    <PopUpModal
      togglePopUpModal={action('clicked')}
      leaveChat={action('clicked')}
      publishLeftChatNotification={action('clicked')}
      removeChannel={action('clicked')}
      currentChannel="direct"
      otherUser={otherUser}
      hasOtherUsers={true}
      currentUser={currentUser}
      isPopUpModalVisible={true}
      publishLeftChannelNotification={() => {}}
      publishLeaveChannel={() => {}}
    />
  ))

  .add('Modal does not render if isPopUpModalVisible is false', () => (
    <PopUpModal
      togglePopUpModal={action('clicked')}
      leaveChat={action('clicked')}
      publishLeftChatNotification={action('clicked')}
      removeChannel={action('clicked')}
      currentChannel="direct"
      otherUser={otherUser}
      hasOtherUsers={true}
      currentUser={currentUser}
      isPopUpModalVisible={false}
      publishLeftChannelNotification={() => {}}
      publishLeaveChannel={() => {}}
    />
  ));
