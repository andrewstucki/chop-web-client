// @flow
/* global SyntheticMouseEvent */
import React from 'react';
import styles from './style.css';

type ButtonType = {
  onClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  text?: string,
  image?: any,
  buttonType?: string,
};

const Button =
(
  {
    onClick,
    text,
    image,
    buttonType,
  }: ButtonType
) => {
  const style = styles[buttonType];
  if (image) {
    return (
      <button
        id="chat-button"
        className={style}
        onClick={onClick}
        onTouchStart={onClick}
        dangerouslySetInnerHTML={{ __html: image }}
      />
    );
  }
  return (
    <button
      className={style}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
