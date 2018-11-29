// @flow
/* global SyntheticEvent, SyntheticKeyboardEvent */
import React, { Component } from 'react';

import type { SharedUserType } from '../feed/dux';

import { isUsingIPad, isUsingIPhone } from '../util';

import Button from '../components/button';
import InputField from '../components/inputField';
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
  inputField: { current: any };

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
    this.noScrollFunction = this.noScrollFunction.bind(this);
    // $FlowFixMe
    this.sendMessage = this.sendMessage.bind(this);
    // $FlowFixMe
    this.inputField = React.createRef();

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
  
  noScrollFunction () {
    if (window.scrollY > 1) setTimeout(() => window.scrollTo(0, 0), 500);
  }

  onFocus () {
    window.scrollTo(0, 0);
    this.props.textOnFocus();

    if (isUsingIPhone()) {
      // The required timing here depends on the phone's speed.
      // Happily it doesn't hurt to scroll to the top multiple times.
      // It might be possible to remove this if we move the text input box
      // higher, so iOS Safari doesn't shove our window offscreen.
      setTimeout(() => window.scrollTo(0, 0), 50);
      setTimeout(() => window.scrollTo(0, 0), 100);
      setTimeout(() => window.scrollTo(0, 0), 150);
    }

    if (isUsingIPad()) {
      // On iPad, when the soft keyboard comes up, that will cause a change
      // in window.innerHeight which tells us how big the soft keyboard is.
      // So, if we see it change, we subtract that amount from our page's height.
      const oldH = window.innerHeight;
      setTimeout (() => {
        const newH = window.innerHeight;
        if (newH < oldH) {
          const shortstyle = 'calc(100% - ' + (oldH - newH) + 'px)';

          // TODO: get this height to ChopContainer in a better way.
          const wrapper: ?HTMLElement = document.querySelector('#wrapper');
          if (wrapper && wrapper instanceof HTMLElement) {
            wrapper.style.height = shortstyle;
          }

          window.scrollTo(0, 0);
        }
      }, 500);  // TODO this is an arbitrarily chosen time. Improve this.
    }

    if (isUsingIPhone() || isUsingIPad()) {
      window.addEventListener('scroll', this.noScrollFunction);
    }
  }

  onBlur () {
    this.props.textOnBlur();

    const iPad = !!navigator.platform && /iPad/.test(navigator.platform);
    if (iPad) {
      // undo the height modification made in onFocus().
      const wrapper: ?HTMLElement = document.querySelector('#wrapper');
      if (wrapper && wrapper instanceof HTMLElement) {
        wrapper.style.height = '';
      }
    }
  }

  sendMessage (event: SyntheticEvent<HTMLButtonElement>) {
    const {
      publishMessage,
      currentUser,
      currentChannel,
    } = this.props;

    event.preventDefault();
    // Must force blur to prevent iOS from displaying 'select all' in text field
    this.inputField.current.props.onBlur();
    publishMessage(currentChannel, this.state.chatInput, currentUser);
    this.setState({chatInput: ''});
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
            // $FlowFixMe
            ref={this.inputField}
          />
          {this.state.chatInput &&
            <Button
              buttonId='chat-button'
              onClick={this.sendMessage}
              image={UpArrow}
              buttonStyle="icon"
              imageType="arrow"
            />
          }
        </div>
      </div>
    );
  }
}

export default Chat;
