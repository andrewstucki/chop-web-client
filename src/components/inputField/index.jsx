// @flow
/* global SyntheticKeyboardEvent, SyntheticFocusEvent */
import React from 'react';
import styles from './styles.css';

type InputFieldProps = {
  type: string,
  label: string,
  name?: string,
  onChange?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  onFocus?: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  onBlur?: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  value?: string,
  placeholder?: string,
  enterDetect?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
};

const InputField =
(
  {
    type,
    label,
    name,
    onChange,
    onFocus,
    onBlur,
    value,
    placeholder,
    enterDetect,
  }: InputFieldProps
) => (
  <div className={styles.inputField}>
    <label htmlFor={name}>{label}</label>
    <input
      id={name}
      type={type}
      name={name}
      onChange={onChange}
      onKeyPress={enterDetect}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      placeholder={placeholder}
    />
  </div>
);

export default InputField;
