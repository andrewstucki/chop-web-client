// @flow
/* global SyntheticEvent, SyntheticKeyboardEvent, TimeoutID */
import React, { Component } from 'react';

import type { SharedUserType } from '../feed/dux';

import { isIOS } from '../util';

import Button from '../components/button';
import InputField from '../components/inputField';
import UpArrow from '../../assets/large-arrow-up.svg';
import styles from './styles.css';

type ChatProps = {
  publishMessage: (channel: string, text: string, user: SharedUserType) => void,
  toggleChatFocus: (focused: boolean) => void,
  toggleHideVideo: (hidden: boolean) => void,
  focused: boolean,
  currentPlaceholder: string,
  currentUser: SharedUserType,
  currentChannel: string,
  initialState?: ChatState,
};

type ChatState = {
  chatInput: string,
};

class Chat extends Component<ChatProps, ChatState> {
  preventScrollTimer: TimeoutID | null;

  constructor (props: ChatProps) {
    super(props);
    // $FlowFixMe
    this.onTextEntered = this.onTextEntered.bind(this);
    // $FlowFixMe
    this.onKeyPressed = this.onKeyPressed.bind(this);
    // $FlowFixMe
    this.onBlur = this.onBlur.bind(this);
    // $FlowFixMe
    this.onFocus = this.onFocus.bind(this);
    // $FlowFixMe
    this.preventScroll = this.preventScroll.bind(this);
    // $FlowFixMe
    this.sendMessage = this.sendMessage.bind(this);

    this.preventScrollTimer = null;

    if (props.initialState) {
      this.state = props.initialState;
    } else {
      this.state = {
        chatInput: '',
      };
    }

    if (isIOS()) {
      window.addEventListener('scroll', this.preventScroll);
    }
  }

  onTextEntered (event: SyntheticEvent<HTMLInputElement>) {
    if (event.target instanceof HTMLInputElement) {
      this.setState({
        chatInput: event.target.value,
      });
    }
  }

  onKeyPressed (event: SyntheticKeyboardEvent<HTMLInputElement>) {
    if (event.charCode === 13 && this.state.chatInput.length > 0) {
      this.props.publishMessage(
        this.props.currentChannel,
        this.state.chatInput,
        this.props.currentUser
      );
      this.setState({chatInput: ''});
    }
  }

  preventScroll () {
    if (this.preventScrollTimer) {
      window.clearTimeout(this.preventScrollTimer);
    }

    this.preventScrollTimer = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  }

  onFocus () {
    this.props.toggleChatFocus(true);

    if (isIOS()) {
      this.props.toggleHideVideo(true);
      const oldH = window.innerHeight;
      window.removeEventListener('scroll', this.preventScroll);
      setTimeout(() => {
        const newH = window.innerHeight;
        if (newH < oldH) {
          const keyboard = oldH - newH;
          window.scrollTo(0, 0);

          const wrapper: ?HTMLElement = document.querySelector('#wrapper');
          if (wrapper && wrapper instanceof HTMLElement) {
            wrapper.style.height = `calc(100% - ${keyboard}px)`;
          }
          window.addEventListener('scroll', this.preventScroll);
        }
      }, 500);
    }
  }

  onBlur () {
    this.props.toggleChatFocus(false);

    if (isIOS()) {
      this.props.toggleHideVideo(false);
      const wrapper: ?HTMLElement = document.querySelector('#wrapper');
      if (wrapper && wrapper instanceof HTMLElement) {
        wrapper.style.height = '100%';
      }
    }
  }

  sendMessage () {
    const {
      publishMessage,
      currentUser,
      currentChannel,
    } = this.props;

    publishMessage(currentChannel, this.state.chatInput, currentUser);
    this.setState({chatInput: ''});
  }

  componentWillUnmount (): void {
    window.removeEventListener('scroll', this.preventScroll);
  }

  render () {
    const {
      focused = false,
      currentPlaceholder,
    } = this.props;

    const style = focused ? styles.focused : styles.default;

    return (
      <div className={styles.background}>
        <div className={style}>
          <InputField
            type='chat'
            onChange={this.onTextEntered}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            value={this.state.chatInput}
            placeholder={currentPlaceholder}
            enterDetect={this.onKeyPressed}
          />

          <Button
            buttonId='chat-button'
            onClick={this.sendMessage}
            keepFocus={true}
            image={UpArrow}
            buttonStyle="icon"
            imageType="arrow"
            disabled={!this.state.chatInput}
            additionalStyles={styles.sendMessage}
          />
        </div>
      </div>
    );
  }
}

export default Chat;
