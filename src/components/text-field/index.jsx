// @flow
import React from 'react';
import { textfield } from './style.css';

type TextFieldProps = {
  onInput?: any,
  onFocus?: any,
  onBlur?: any,
  value?: string
}

const TextField =
(
  {onInput,
    onFocus,
    onBlur,
    value
  }: TextFieldProps) =>
(
  <input
    className={textfield}
    type="text"
    onKeyUp={onInput}
    onFocus={onFocus}
    onBlur={onBlur}
    value={value} />
);

export default TextField;