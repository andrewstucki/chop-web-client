// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PopUpModal from '../src/components/popUpModal';
import '../assets/global.css';

storiesOf('PopUpModal', module)
  .add('Modal', () => (
    <PopUpModal
      actionOne={action('clicked')}
      actionTwo={action('clicked')}
      actionOneDescription="Leave"
      actionTwoDescription="Stay"
    >
      <div>
        Are you sure you want to end your chat with <strong>Fred</strong>?
      </div>
    </PopUpModal>
  ))
