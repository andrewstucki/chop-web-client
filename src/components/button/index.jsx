// @flow
/* global SyntheticMouseEvent */
import React, { Component } from 'react';
import styles from './style.css';

type ButtonPropsType = {
  buttonId?: string,
  onClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  onTouchStart?: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  buttonStyle: 'primary' | 'secondary' | 'tertiary' | 'icon',
  text?: string,
  image?: any,
  disabled?: boolean,
  hidden?: boolean,
  additionalStyles?: string,
  small?: boolean | void,
};

class Button extends Component<ButtonPropsType, void> {
  node: { current: HTMLButtonElement }

  constructor (props: ButtonPropsType) {
    super(props);
    // $FlowFixMe
    this.node = React.createRef();
  }

  render () {
    const {
      buttonId,
      onClick,
      onTouchStart,
      text,
      image,
      buttonStyle,
      disabled,
      hidden,
      additionalStyles = '',
      small = false,
    } = this.props;

    const buttonSizeStyle = small ? styles.small : styles.default;

    const style = `${styles.button} ${styles[buttonStyle]} ${additionalStyles} ${buttonSizeStyle}`.trim();

    if (buttonStyle === 'icon') {
      return (
        <button
          // $FlowFixMe
          ref={this.node}
          id={buttonId}
          className={style}
          onClick={onClick}
          onTouchStart={onTouchStart}
          dangerouslySetInnerHTML={{ __html: image }}
          disabled={disabled}
          hidden={hidden}
        />
      );
    } else {
      return (
        <button
          // $FlowFixMe
          ref={this.node}
          id={buttonId}
          className={style}
          onClick={onClick}
          onTouchStart={onTouchStart}
          disabled={disabled}
          hidden={hidden}
        >
          {text}
        </button>
      );
    }
  }
}

export default Button;
