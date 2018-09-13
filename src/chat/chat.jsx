// @flow
/* global SyntheticEvent, SyntheticKeyboardEvent */
import React, { Component } from 'react';

import type { SharedUserType } from '../feed/dux';

import Button from '../components/button';
import TextField from '../components/text-field';
import UpArrow from '../../assets/large-arrow-up.svg';
import styles from './styles.css';

type ChatProps = {
  publishMessage: (channel: string, text: string, user: SharedUserType) => void,
  textOnBlur:  () => void,
  textOnFocus:  () => void,
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

    if (props.initialState) {
      this.state = props.initialState;
    } else {
      this.state = {
        chatInput: '',
      };
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

  onFocus () {
    setTimeout(() => {
      if (document.body && document.documentElement) {
        document.body.style.height = window.innerHeight + 'px';
        document.documentElement.style.height = window.innerHeight + 'px';
        window.scroll({
          top: 0,
          behavior: 'instant',
        });
      }
    }, 200);
    this.props.textOnFocus();
  }

  onBlur () {
    if (document.body && document.documentElement) {
      document.body.style.height = '100%';
      document.documentElement.style.height = '100%';
      window.scroll({
        top: 0,
        behavior: 'instant',
      });
    }
    this.props.textOnBlur();
  }

  render () {
    const {
      publishMessage,
      focused = false,
      currentPlaceholder,
      currentUser,
      currentChannel,
    } = this.props;

    const style = focused ? styles.focused : styles.default;

    return (
      <div className={styles.background}>
        <div className={style}>
          <TextField
            onInput={this.onTextEntered}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            value={this.state.chatInput}
            placeholder={currentPlaceholder}
            enterDetect={this.onKeyPressed}
          />
          {this.state.chatInput &&
            <Button
              onClick={() => (
                publishMessage(currentChannel, this.state.chatInput, currentUser),
                this.setState({chatInput: ''})
              )}
              image={UpArrow}
              buttonType="icon"
              imageType="arrow"
            />
          }
        </div>
      </div>
    );
  }
}

export default Chat;
