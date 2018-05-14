// @flow
/* global SyntheticKeyboardEvent, SyntheticFocusEvent */
import React from 'react';
import { textfield } from './style.css';

type TextFieldProps = {
  onInput?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  onFocus?: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  onBlur?: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  value?: string,
  placeholder?: string,
  enterDetect?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
}

const TextField =
(
  {
    onInput,
    onFocus,
    onBlur,
    value,
    placeholder,
    enterDetect,
  }: TextFieldProps
) => (
  <input
    className={textfield}
    type="text"
    onChange={onInput}
    onKeyPress={enterDetect}
    onFocus={onFocus}
    onBlur={onBlur}
    value={value}
    placeholder={placeholder} />
);

export default TextField;
