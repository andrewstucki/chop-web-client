// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PopUpModal from '../src/popUpModal/popUpModal';
import '../assets/global.css';

storiesOf('PopUpModal', module)
  .add('Modal renders if isPopUpModalVisible is true', () => (
    <PopUpModal
      togglePopUpModal={action('clicked')}
      leaveChat={action('clicked')}
      publishLeftChatNotification={action('clicked')}
      removeChannel={action('clicked')}
      currentChannel="direct"
      otherUser={
        {
          id: '12345',
          nickname: 'Walker, Texas Ranger',
        }
      }
      currentUser={
        {
          id: '12345',
          nickname: 'Jimmy Trivette',
        }
      }
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
      otherUser={
        {
          id: '12345',
          nickname: 'Walker, Texas Ranger',
        }
      }
      currentUser={
        {
          id: '12345',
          nickname: 'Jimmy Trivette',
        }
      }
      isPopUpModalVisible={false}
    />
  ));
