// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import PopUpModal from '../src/components/popUpModal';
import '../assets/global.css';

storiesOf('PopUpModal', module)
  .add('Modal', () => (
    <PopUpModal
      alertText="Are you sure you want to end your chat with"
      nickname="Fred"
      actionOne={() => {}}
      actionTwo={() => {}}
      actionOneDescription="Leave"
      actionTwoDescription="Stay"
    />
  ))
