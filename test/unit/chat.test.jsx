// @flow
import Adapter from 'enzyme-adapter-react-16';
import IconButton from '../../src/components/iconButton';
import ChatInput from '../../src/components/chatInput';
import Chat from '../../src/chat/chat';
import Enzyme from 'enzyme';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });

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
    const wrapper = Enzyme.shallow(
      <Chat
        toggleChatFocus={function () {}}
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
      />
    );
    wrapper.setState({
      chatInput: 'Hello',
    });
    expect(wrapper.find(ChatInput).length).toBe(1);
    expect(wrapper.find(IconButton).length).toBe(1);
  });

  test('has a InputField and disabled Button', () => {
    const wrapper = Enzyme.shallow(
      <Chat
        toggleChatFocus={function () {}}
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
      />
    );
    expect(wrapper.find(ChatInput).length).toBe(1);
    const button = wrapper.find(IconButton);
    expect(button.length).toBe(1);
    expect(button.props()).toHaveProperty('disabled');
  });
});
