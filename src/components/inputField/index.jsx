// @flow
/* global SyntheticKeyboardEvent, SyntheticFocusEvent */
import React, { Component } from 'react';
import styles from './styles.css';

type InputFieldProps = {
  type: string,
  label?: string,
  name?: string,
  onChange?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
  onFocus?: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  onBlur?: (event: SyntheticFocusEvent<HTMLInputElement>) => void,
  value?: string,
  placeholder?: string,
  enterDetect?: (event: SyntheticKeyboardEvent<HTMLInputElement>) => void,
};

class InputField extends Component<InputFieldProps, void> {
  input: { current: HTMLInputElement }

  constructor (props:InputFieldProps) {
    super(props);
    // $FlowFixMe
    this.input = React.createRef();
  }

  value () {
    return this.input.current.value;
  }

  render () {
    const {
      type,
      label,
      name,
      onChange,
      onFocus,
      onBlur,
      value,
      placeholder,
      enterDetect,
    } = this.props;
    if (type === 'chat') {
      return (
        <input
          id='chat'
          className={styles.chat}
          type='text'
          onChange={onChange}
          onKeyPress={enterDetect}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          autocomplete="off"
          // $FlowFixMe
          ref={this.input}
        />
      );
    } else {
      return (
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
            // $FlowFixMe
            ref={this.input}
          />
        </div>
      );
    }
  }
}

export default InputField;
