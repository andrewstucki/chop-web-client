// @flow
/* global SyntheticMouseEvent, SyntheticKeyboardEvent, SyntheticFocusEvent */
import React, { Component } from 'react';
import Button from '../components/button';
import TextField from '../components/text-field';
import UpArrow from '../../assets/large-arrow-up.svg';
import styles from './styles.css';

type ChatProps = {
  buttonOnClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  textOnInput:  (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  textOnBlur:  (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  textOnFocus:  (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  textValue: string,
  textEntered: boolean,
  focused: boolean,
  enterDetect: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  currentPlaceholder: string,
};

class Chat extends Component<ChatProps> {
  render () {
    const {
      buttonOnClick,
      textOnInput,
      textOnBlur,
      textOnFocus,
      textValue,
      textEntered = false,
      focused = false,
      enterDetect,
      currentPlaceholder,
    } = this.props;

    const style = focused ? styles.focused : styles.default;
    return (
      <div className={styles.background}>
        <div className={style}>
          <TextField
            onInput={textOnInput}
            onBlur={textOnBlur}
            onFocus={textOnFocus}
            value={textValue}
            placeholder={currentPlaceholder}
            enterDetect={enterDetect}
          />
          {textEntered &&
            <Button
              onClick={buttonOnClick}
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
