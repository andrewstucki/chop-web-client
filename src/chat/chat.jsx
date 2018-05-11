// @flow
/* global SyntheticMouseEvent, SyntheticKeyboardEvent, SyntheticFocusEvent */
import React from 'react';
import Button from '../components/button';
import TextField from '../components/text-field';
import chatStyle from './style.css';

type ChatProps = {
  buttonOnClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  textOnInput:  (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  textOnBlur:  (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  textOnFocus:  (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  textValue: string,
  textEntered: boolean,
  focused: boolean,
}

const Chat =
(
  {
    buttonOnClick,
    textOnInput,
    textOnBlur,
    textOnFocus,
    textValue,
    textEntered = false,
    focused = false,
    enterDetect,
  }: ChatProps
) => {
  const style = focused ? chatStyle.focused : chatStyle.default;

  return (
    <div className={style}>
      <TextField
        onInput={textOnInput}
        onBlur={textOnBlur}
        onFocus={textOnFocus}
        value={textValue}
        placeholder="Chat"
        enterDetect={enterDetect} />
      {textEntered &&
        <Button
          onClick={buttonOnClick}
          text="↑" />
      }
    </div>
  );
};

export default Chat;
