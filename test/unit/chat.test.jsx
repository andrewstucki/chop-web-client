// @flow
import Adapter from 'enzyme-adapter-react-16';
import Button from '../../src/components/button';
import TextField from '../../src/components/text-field';
import Chat from '../../src/chat/chat';
import Enzyme from 'enzyme';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });

describe('Chat tests', () => {
  test('has a TextField and Button', () => {
    const wrapper = Enzyme.shallow(
      <Chat
        textOnBlur={function () {}}
        textOnFocus={function () {}}
        buttonOnClick={function () {}}
        focused={true}
        enterDetect={function () {}}
        currentPlaceholder=""
        currentChannel="public"
        currentUser={
          {
            id: '12345',
            nickname: 'Wilbur',
          }
        }
        publishMessage={() => {}}
      />
    );
    wrapper.setState({
      chatInput: 'Hello',
    });
    expect(wrapper.find(TextField).length).toBe(1);
    expect(wrapper.find(Button).length).toBe(1);
  });

  test('has a TextField but not a Button', () => {
    const wrapper = Enzyme.shallow(
      <Chat
        textOnBlur={function () {}}
        textOnFocus={function () {}}
        buttonOnClick={function () {}}
        focused={false}
        enterDetect={function () {}}
        currentPlaceholder=""
        currentChannel="public"
        currentUser={
          {
            id: '12345',
            nickname: 'Wilbur',
          }
        }
        publishMessage={() => {}}
      />
    );
    expect(wrapper.find(TextField).length).toBe(1);
    expect(wrapper.find(Button).length).toBe(0);
  });
});
