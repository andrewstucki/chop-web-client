// @flow
/* global SyntheticKeyboardEvent, SyntheticFocusEvent */
import React from 'react';
import Input from './styles';

type ChatInputProps = {
  onChange: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  onFocus: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  onBlur: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  value: string,
  placeholder: string,
  enterDetect: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  id: string,
  pendingPrayer: boolean,
};

const ChatInput = ({ onChange, onFocus, onBlur, value, placeholder, enterDetect, id, pendingPrayer }:ChatInputProps) => (
  <Input
    data-testid={id}
    type='text'
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
    value={value}
    placeholder={placeholder}
    onKeyPress={enterDetect}
    autoComplete="off"
    disabled={pendingPrayer}
  />
);

export default React.memo < ChatInputProps > (ChatInput);
