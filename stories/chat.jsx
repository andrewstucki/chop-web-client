/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Chat from '../src/chat/chat';

storiesOf('Chat', module)
  .add('default', () => (
    <Chat placeholder="Chat" />
  ))
  .add('focused', () => (
    <Chat placeholder="Chat" focused={true} />
  ))
  .add('focused and text entered', () => (
    <Chat textValue="Hello my peeps" focused={true} textEntered={true} />
  ))
  .add('text entered', () => (
    <Chat textValue="Hello my peeps" focused={false} textEntered={true} />
  ));