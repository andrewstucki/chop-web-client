// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PopUpModal from '../src/popUpModal/popUpModal';
import '../assets/global.css';

storiesOf('PopUpModal', module)
  .add('Modal renders if showPopUpModal is true', () => (
    <PopUpModal
      keepChatting={action('clicked')}
      leaveChat={action('clicked')}
      user={
        {
          id: '12345',
          nickname: 'Walker, Texas Ranger',
        }
      }
      showPopUpModal={true}
    />
  ))

  .add('Modal does not render if showPopUpModal is false', () => (
    <PopUpModal
      keepChatting={action('clicked')}
      leaveChat={action('clicked')}
      user={
        {
          id: '12345',
          nickname: 'Walker, Texas Ranger',
        }
      }
      showPopUpModal={false}
    />
  ));
