// @flow
/* global SyntheticMouseEvent */
import React from 'react';
import styles from './style.css';

type ButtonType = {
  buttonId?: string,
  onClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  buttonStyle: 'primary' | 'secondary' | 'tertiary' | 'icon',
  text?: string,
  image?: any,
  disabled?: boolean
};

const Button =
(
  {
    buttonId,
    onClick,
    text,
    image,
    buttonStyle,
    disabled,
  }: ButtonType
) => {
  const style = `${styles.button} ${styles[buttonStyle]}`;
  if (buttonStyle === 'icon') {
    return (
      <button
        id={buttonId}
        className={style}
        onClick={onClick}
        onTouchStart={onClick}
        dangerouslySetInnerHTML={{ __html: image }}
        disabled={disabled}
      />
    );
  } else {
    return (
      <button
        id={buttonId}
        className={style}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    );
  }
};

export default Button;
