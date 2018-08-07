// @flow
/* global SyntheticEvent, SyntheticKeyboardEvent, SyntheticFocusEvent */
import React, { Component } from 'react';

import type { UserType } from '../feed/dux';

import Button from '../components/button';
import TextField from '../components/text-field';
import UpArrow from '../../assets/large-arrow-up.svg';
import styles from './styles.css';

type ChatProps = {
  publishMessage: (channel: string, text: string, user: UserType) => void,
  textOnBlur:  (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  textOnFocus:  (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  focused: boolean,
  currentPlaceholder: string,
  currentUser: UserType,
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

  render () {
    const {
      publishMessage,
      textOnBlur,
      textOnFocus,
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
            onBlur={textOnBlur}
            onFocus={textOnFocus}
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
