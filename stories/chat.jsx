// @flow
/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Chat from '../src/chat/chat';

const user = {
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
      textOnBlur={() => {}}
      textOnFocus={() => {}}

    />
  ))
  .add('focused', () => (
    <Chat
      currentPlaceholder="Chat"
      currentChannel="public"
      currentUser={user}
      focused={true}
      publishMessage={() => {}}
      textOnBlur={() => {}}
      textOnFocus={() => {}}
    />
  ))
  .add('focused and text entered', () => (
    <Chat
      currentPlaceholder="Chat"
      currentChannel="public"
      currentUser={user}
      focused={true}
      publishMessage={() => {}}
      textOnBlur={() => {}}
      textOnFocus={() => {}}
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
      textOnBlur={() => {}}
      textOnFocus={() => {}}
      initialState={{ chatInput: 'Hello my peeps' }}
    />
  ));
