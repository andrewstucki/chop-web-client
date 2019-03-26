// @flow
import Chat from '../../src/chat/chat';
import React from 'react';
import { fireEvent } from 'react-testing-library';
import { renderWithReduxAndTheme } from '../testUtils';

const otherUser = {
  id: '12345',
  pubnubToken: '12345',
  name: 'Billy Bob',
  role: {
    label: '',
  },
};

describe('Chat tests', () => {
  test('has a InputField and Button', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Chat
        setChatFocus={function () {}}
        setKeyboardHeight={function () {}}
        toggleHideVideo={function () {}}
        buttonOnClick={function () {}}
        focused={true}
        keyboardHeight={undefined}
        enterDetect={function () {}}
        currentPlaceholder=""
        currentChannel="public"
        currentUser={otherUser}
        publishMessage={() => {}}
        hideReactions={true}
      />
    );


    fireEvent.change(getByTestId('chat-input'), { target: { value: 'Hello' } });
    expect(getByTestId('chat-input').value).toEqual('Hello');
    expect(getByTestId('chat-submit-button')).toBeTruthy();
  });

  test('has a InputField and disabled Button', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Chat
        setChatFocus={function () {}}
        setKeyboardHeight={function () {}}
        toggleHideVideo={function () {}}
        buttonOnClick={function () {}}
        focused={false}
        keyboardHeight={undefined}
        enterDetect={function () {}}
        currentPlaceholder=""
        currentChannel="public"
        currentUser={otherUser}
        publishMessage={() => {}}
        hideReactions={true}
      />
    );

    expect(getByTestId('chat-submit-button')).toHaveProperty('disabled');
  });
});
