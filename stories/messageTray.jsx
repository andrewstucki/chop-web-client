// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import MessageTray from '../src/components/messageTray';
import '../assets/global.css';

storiesOf('MessageTray', module)
  .add('with buttons', () => (
    <MessageTray
      messageId='123'
      messageTrayOpen={true}
      trayButtonOnClick={() => {}}
    />
  ))
