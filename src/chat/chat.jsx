// @flow
/* global SyntheticEvent, SyntheticKeyboardEvent, TimeoutID, IntervalID */
import React, { Component } from 'react';

import type { SharedUserType } from '../users/dux';

import { isIOS, isIPhone } from '../util';
import UpArrow from '../icons/upArrow';
import IconButton from '../components/iconButton';
import { theme } from '../styles';
import { Background, Wrapper } from './styles';
import ChatInput from '../components/chatInput';

type ChatProps = {
  publishMessage: (channel: string, text: string, user: SharedUserType) => void,
  setChatFocus: (channel: string) => void,
  setKeyboardHeight: (height: number) => void,
  toggleHideVideo: (hidden: boolean) => void,
  focused: boolean,
  keyboardHeight: number | typeof undefined,
  currentPlaceholder: string,
  currentUser: SharedUserType,
  currentChannel: string,
  initialState?: ChatState,
  hideReactions: boolean,
};

type ChatState = {
  chatInput: string,
  windowHeight: number,
};

class Chat extends Component<ChatProps, ChatState> {
  preventScrollTimer: TimeoutID | null;
  pollKeyboardInterval: IntervalID | null;
  pollCount: number;

  constructor (props: ChatProps) {
    super(props);

    this.preventScrollTimer = null;
    this.pollKeyboardInterval = null;
    this.pollCount = 0;

    if (props.initialState) {
      this.state = props.initialState;
    } else {
      this.state = {
        chatInput: '',
        windowHeight: 0,
        keyboardHeight: 0,
      };
    }

    if (isIOS()) {
      window.addEventListener('scroll', this.preventScroll, { passive: false });
    }
  }

  componentDidMount () {
    this.setState({
      windowHeight: window.innerHeight,
    });
  }


  onTextEntered = (event: SyntheticEvent<HTMLInputElement>) => {
    if (event.target instanceof HTMLInputElement) {
      this.setState({
        chatInput: event.target.value,
      });
    }
  };

  onKeyPressed = (event: SyntheticKeyboardEvent<HTMLInputElement>) => {
    if (event.charCode === 13 && this.state.chatInput.length > 0) {
      this.props.publishMessage(
        this.props.currentChannel,
        this.state.chatInput,
        this.props.currentUser
      );
      this.setState({chatInput: ''});
    }
  };

  preventScroll = () => {
    if (this.preventScrollTimer) {
      window.clearTimeout(this.preventScrollTimer);
    }

    this.preventScrollTimer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 30);
  };

  pollForKeyboard  = () => {
    const { windowHeight } = this.state;
    this.pollCount = 0;

    this.pollKeyboardInterval = setInterval(() => {
      const newHeight = window.innerHeight;

      if (this.pollCount > 100) {
        clearInterval(this.pollKeyboardInterval);
      }

      if (newHeight < windowHeight) {
        const keyboard = windowHeight - newHeight;

        this.setWrapperHeight(keyboard);
        this.props.setKeyboardHeight(keyboard);

        clearInterval(this.pollKeyboardInterval);
      }

      this.pollCount += 1;
    }, 0);
  };

  setWrapperHeight = (keyboardHeight:number) => {
    const wrapper: ?HTMLElement = document.querySelector('#wrapper');
    if (wrapper && wrapper instanceof HTMLElement) {
      wrapper.style.height = `calc(100% - ${keyboardHeight}px)`;
    }
  };

  onFocus = () => {
    const { keyboardHeight } = this.props;
    this.props.setChatFocus(this.props.currentChannel);

    if (isIOS()) {
      if (isIPhone()) {
        this.props.toggleHideVideo(true);
      }
      if (keyboardHeight && keyboardHeight > 0) {
        this.setWrapperHeight(keyboardHeight);
      } else {
        this.pollForKeyboard();
      }
    }
  };

  onBlur = () => {
    this.props.setChatFocus('');

    if (isIOS()) {
      if (isIPhone()) {
        this.props.toggleHideVideo(false);
      }
      const wrapper: ?HTMLElement = document.querySelector('#wrapper');
      if (wrapper && wrapper instanceof HTMLElement) {
        wrapper.style.height = '100%';
      }
      clearInterval(this.pollKeyboardInterval);
    }
  };

  sendMessage = () => {
    const {
      publishMessage,
      currentUser,
      currentChannel,
    } = this.props;

    publishMessage(currentChannel, this.state.chatInput, currentUser);
    this.setState({chatInput: ''});
  };

  componentWillUnmount (): void {
    window.removeEventListener('scroll', this.preventScroll);
    clearInterval(this.pollKeyboardInterval);
    clearTimeout(this.preventScrollTimer);
    this.onBlur();
  }

  render () {
    const {
      focused = false,
      currentPlaceholder,
      hideReactions,
    } = this.props;

    return (
      <Background hideReactions={hideReactions}>
        <Wrapper focused={focused}>
          <ChatInput
            id="chat-input"
            onChange={this.onTextEntered}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            value={this.state.chatInput}
            placeholder={currentPlaceholder}
            enterDetect={this.onKeyPressed}
          />

          <IconButton
            id="chat-submit-button"
            size={36}
            onClick={this.sendMessage}
            keepFocus={true}
            disabled={!this.state.chatInput}
            background={theme.colors.primary}
          >
            <UpArrow size={24} color={theme.colors.background}/>
          </IconButton>
        </Wrapper>
      </Background>
    );
  }
}

export default React.memo < ChatProps > (Chat);
