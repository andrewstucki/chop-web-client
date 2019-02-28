// @flow
/* global SyntheticKeyboardEvent, SyntheticFocusEvent */
import React from 'react';
import { Wrapper, Input, Label } from './styles';

type InputFieldProps = {
  type: string,
  label: string,
  name: string,
  onChange?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  onFocus?: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  onBlur?: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  value?: string,
  placeholder?: string,
};

const InputField = ({ type, label, name, onChange, onFocus, onBlur, value, placeholder }: InputFieldProps) => (
  <Wrapper>
    <Label htmlFor={name}>{label}</Label>
    <Input
      type={type}
      name={name}
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      placeholder={placeholder}
    />
  </Wrapper>
);

InputField.whyDidYouRender = true;

export default React.memo < InputFieldProps > (InputField);
