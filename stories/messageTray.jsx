// @flow
import React from 'react';
import { storiesOf } from '@storybook/react';
import MessageTray from '../src/components/messageTray';
import '../assets/global.css';

storiesOf('MessageTray', module)
  .add('with buttons', () => (
    <MessageTray
      messageId='123'
      messageTrayOpen={true}
      closeMessageTray={() => {}}
      deleteMessage={() => {}}
      muteUser={() => {}}
    />
  ))
