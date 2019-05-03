// @flow
/* global SyntheticEvent, SyntheticKeyboardEvent */
import React, { useState } from 'react';
import type { SharedUserType } from '../users/dux';
import UpArrow from '../icons/upArrow';
import IconButton from '../components/iconButton';
import { theme } from '../styles';
import { Background, Wrapper } from './styles';
import ChatInput from '../components/chatInput';

type ChatProps = {
  publishMessage: (channel: string, text: string, user: SharedUserType, language: string) => void,
  setChatFocus: (channel: string) => void,
  focused: boolean,
  currentPlaceholder: string,
  currentUser: SharedUserType,
  currentChannel: string,
  hideReactions: boolean,
  translateLanguage: string,
};

function Chat (props:ChatProps) {
  const { publishMessage, setChatFocus, focused, currentPlaceholder, currentUser, currentChannel, hideReactions, translateLanguage } = props;
  const [ message, setMessage ] = useState <string> ('');

  const sendMessage = () => {
    publishMessage(
      currentChannel,
      message,
      currentUser,
      translateLanguage,
    );
    setMessage('');
  };

  const onTextEntered = (event: SyntheticEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      setMessage(event.target.value);
    }
  };

  const onKeyPressed = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (event.charCode === 13 && message.length > 0) {
      sendMessage();
    }
  };

  const onFocus = () => setChatFocus(currentChannel);
  const onBlur = () => setChatFocus('');

  return (
    <Background hideReactions={hideReactions}>
      <Wrapper focused={focused}>
        <ChatInput
          id="chat-input"
          onChange={onTextEntered}
          onBlur={onBlur}
          onFocus={onFocus}
          value={message}
          placeholder={currentPlaceholder}
          enterDetect={onKeyPressed}
        />

        <IconButton
          id="chat-submit-button"
          size={36}
          onClick={sendMessage}
          keepFocus={true}
          disabled={!message}
          background={theme.colors.primary}
        >
          <UpArrow size={24} color={theme.colors.background}/>
        </IconButton>
      </Wrapper>
    </Background>
  );
}

export default Chat;
