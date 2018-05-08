// @flow
/* global SyntheticKeyboardEvent, SyntheticFocusEvent */
import React from 'react';
import { textfield } from './style.css';

type TextFieldProps = {
  onInput?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  onFocus?: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  onBlur?: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  value?: string
}

const TextField =
(
  {
    onInput,
    onFocus,
    onBlur,
    value,
  }: TextFieldProps
) => (
  <input
    className={textfield}
    type="text"
    onKeyUp={onInput}
    onFocus={onFocus}
    onBlur={onBlur}
    value={value} />
);

export default TextField;