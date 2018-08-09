// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PopUpModal from '../src/popUpModal/popUpModal';
import '../assets/global.css';

const otherUser = {
  pubnubToken: '12345',
  name: 'Walker, Texas Ranger',
  role: { label: '' },
};
const currentUser = {
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
      currentUser={currentUser}
      isPopUpModalVisible={true}
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
      currentUser={currentUser}
      isPopUpModalVisible={false}
    />
  ));
