// @flow
import Adapter from 'enzyme-adapter-react-16';
import Button from '../../src/components/button';
import InputField from '../../src/components/inputField';
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
    expect(wrapper.find(InputField).length).toBe(1);
    expect(wrapper.find(Button).length).toBe(1);
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
    expect(wrapper.find(InputField).length).toBe(1);
    const button = wrapper.find(Button);
    expect(button.length).toBe(1);
    expect(button.props()).toHaveProperty('disabled');
  });
});
