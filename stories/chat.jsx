import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Chat from '../src/chat';

storiesOf('Chat', module)
  .add('basic', () => (
    <Chat />
  ))