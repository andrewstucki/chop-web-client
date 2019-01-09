// @flow
/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Chat from '../src/chat/chat';

const user = {
  id: '12345',
  pubnubToken: '12345',
  name: 'Billy Bob',
  role: { label: '' },
};

storiesOf('Chat', module)
  .add('default', () => (
    <Chat
      currentPlaceholder="Chat"
      currentChannel="public"
      currentUser={user}
      focused={false}
      publishMessage={() => {}}
      toggleChatFocus={() => {}}
      toggleHideVideo={() => {}}

    />
  ))
  .add('focused', () => (
    <Chat
      currentPlaceholder="Chat"
      currentChannel="public"
      currentUser={user}
      focused={true}
      publishMessage={() => {}}
      toggleChatFocus={() => {}}
      toggleHideVideo={() => {}}
    />
  ))
  .add('focused and text entered', () => (
    <Chat
      currentPlaceholder="Chat"
      currentChannel="public"
      currentUser={user}
      focused={true}
      publishMessage={() => {}}
      toggleChatFocus={() => {}}
      toggleHideVideo={() => {}}
      initialState={{ chatInput: 'Hello my peeps'}}
    />
  ))
  .add('text entered', () => (
    <Chat
      currentPlaceholder="Chat"
      currentChannel="public"
      currentUser={user}
      focused={false}
      publishMessage={() => {}}
      toggleChatFocus={() => {}}
      toggleHideVideo={() => {}}
      initialState={{ chatInput: 'Hello my peeps' }}
    />
  ));
