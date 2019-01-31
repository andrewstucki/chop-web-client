// @flow
/* global SyntheticMouseEvent */
import React, { Component } from 'react';
import styles from './style.css';
import { Actionable } from '../Actionable';

type ButtonPropsType = {
  buttonId?: string,
  onClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  keepFocus?: boolean,
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
      keepFocus = false,
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
        <Actionable onClick={onClick} keepFocus={keepFocus}>
          <button
            // $FlowFixMe
            ref={this.node}
            id={buttonId}
            className={style}
            dangerouslySetInnerHTML={{ __html: image }}
            disabled={disabled}
            hidden={hidden}
          />
        </Actionable>
      );
    } else {
      return (
        <Actionable onClick={onClick} keepFocus={keepFocus}>
          <button
            // $FlowFixMe
            ref={this.node}
            id={buttonId}
            className={style}
            disabled={disabled}
            hidden={hidden}
          >
            {text}
          </button>
        </Actionable>
      );
    }
  }
}

export default Button;
