// @flow
/* global SyntheticEvent, SyntheticKeyboardEvent */
import React from 'react';
import type { SharedSubscriberType } from '../subscriber/dux';
import UpArrow from '../icons/upArrow';
import IconButton from '../components/iconButton';
import { theme } from '../styles';
import { Background, Wrapper } from './styles';
import ChatInput from '../components/chatInput';

type ChatProps = {
  publishMessage: (channel: string, text: string, subscriber: SharedSubscriberType, language: string) => void,
  setChatFocus: (channel: string) => void,
  setNickname: () => void,
  saveMessage: (id: string, message: string) => void,
  clearMessage: (id: string) => void,
  focused: boolean,
  currentPlaceholder: string,
  currentSubscriber: SharedSubscriberType,
  currentChannel: string,
  hideReactions: boolean,
  translateLanguage: string,
  message: string,
  pendingPrayer: boolean,
};

function Chat (props:ChatProps) {
  const { publishMessage, setChatFocus, focused, currentPlaceholder, currentSubscriber, currentChannel, hideReactions, translateLanguage, setNickname, saveMessage, clearMessage, message, pendingPrayer } = props;

  const sendMessage = () => {
    if (currentSubscriber.nickname !== '') {
      publishMessage(
        currentChannel,
        message,
        currentSubscriber,
        translateLanguage,
      );
      clearMessage(currentChannel);
    } else {
      saveMessage(currentChannel, message);
      setNickname();
    }
  };

  const onTextEntered = (event: SyntheticEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      saveMessage(currentChannel, event.target.value);
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
    <Background data-testid='chat' hideReactions={hideReactions}>
      <Wrapper focused={focused}>
        <ChatInput
          id="chat-input"
          onChange={onTextEntered}
          onBlur={onBlur}
          onFocus={onFocus}
          value={message}
          placeholder={currentPlaceholder}
          enterDetect={onKeyPressed}
          pendingPrayer={pendingPrayer}
        />

        <IconButton
          id="chat-submit-button"
          size={32}
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
