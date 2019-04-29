// @flow
/* global SyntheticKeyboardEvent, SyntheticFocusEvent */
import React, { useRef, useImperativeHandle } from 'react';
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
  autoComplete?: string,
};

function InputField ({ type, label, name, onChange, onFocus, onBlur, value, placeholder, autoComplete }: InputFieldProps, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    value: () => {
      const { current } = inputRef;
      return current === null ? '' : current.value;
    },
  }));

  return (
    <Wrapper>
      <Label htmlFor={name}>{label}</Label>
      <Input
        ref={inputRef}
        type={type}
        name={name}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        placeholder={placeholder}
        data-testid={name}
        autoComplete={autoComplete}
      />
    </Wrapper>
  );
}

// any is used because of useImperativeHandle. There may be a better type definition.
export default React.forwardRef <InputFieldProps, any> (InputField);
