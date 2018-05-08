// @flow
/* global SyntheticMouseEvent, SyntheticKeyboardEvent, SyntheticFocusEvent */
import React from 'react';
import Button from '../components/button';
import TextField from '../components/text-field';

type ChatProps = {
  buttonOnClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  textOnInput:  (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  textOnBlur:  (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  textOnFocus:  (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  textValue: string,
}

const Chat =
(
  {
    buttonOnClick,
    textOnInput,
    textOnBlur,
    textOnFocus,
    textValue,
  }: ChatProps
) => (
  <div>
    <TextField
      onInput={textOnInput}
      onBlur={textOnBlur}
      onFocus={textOnFocus}
      value={textValue} />
    <Button
      onClick={buttonOnClick}
      text="Send" />
  </div>
);

export default Chat;