// @flow
/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Chat from '../src/chat/chat';

storiesOf('Chat', module)
  .add('default', () => (
    <Chat
      currentPlaceholder="Chat"
      currentChannel="public"
      currentUser={
        {
          id: '12345',
          nickname: 'Billy Bob',
        }
      }
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
      currentUser={
        {
          id: '12345',
          nickname: 'Billy Bob',
        }
      }
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
      currentUser={
        {
          id: '12345',
          nickname: 'Billy Bob',
        }
      }
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
      currentUser={
        {
          id: '12345',
          nickname: 'Billy Bob',
        }
      }
      focused={false}
      publishMessage={() => {}}
      textOnBlur={() => {}}
      textOnFocus={() => {}}
      initialState={{ chatInput: 'Hello my peeps' }}
    />
  ));
