// @flow
import React, { useRef, useImperativeHandle, type Node } from 'react';
import { Wrapper, Input, Label } from './styles';
import Tooltip from '../tooltip';

type InputFieldProps = {
  type: string,
  label: string,
  name: string,
  tooltipContent?: Node,
  onChange?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  onFocus?: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  onBlur?: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  value?: string,
  placeholder?: string,
  autoComplete?: string,
};

type ImperativeHandleType = {
  value: () => string,
};

function InputField ({ type, label, name, onChange, onFocus, onBlur, value, placeholder, autoComplete, tooltipContent }: InputFieldProps, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    value: () => {
      const { current } = inputRef;
      return current === null ? '' : current.value;
    },
  }));

  return (
    <Wrapper>
      <Label htmlFor={name}>
        {label}
        {tooltipContent && <Tooltip content={tooltipContent} />}
      </Label>
      <Input
        id={name}
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

export default React.forwardRef <InputFieldProps, ImperativeHandleType> (InputField);
