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
  disabled?: boolean,
  hidden?: boolean,
  additionalStyles?: string,
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
    hidden,
    additionalStyles = '',
  }: ButtonType
) => {
  const style = `${styles.button} ${styles[buttonStyle]} ${additionalStyles}`.trim();
  if (buttonStyle === 'icon') {
    return (
      <button
        id={buttonId}
        className={style}
        onClick={onClick}
        dangerouslySetInnerHTML={{ __html: image }}
        disabled={disabled}
        hidden={hidden}
      />
    );
  } else {
    return (
      <button
        id={buttonId}
        className={style}
        onClick={onClick}
        disabled={disabled}
        hidden={hidden}
      >
        {text}
      </button>
    );
  }
};

export default Button;
