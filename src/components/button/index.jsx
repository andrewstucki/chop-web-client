// @flow
/* global SyntheticMouseEvent */
import React from 'react';
import styles from './style.css';

type ButtonType = {
  onClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  text: string,
  type: string,
};

const Button =
(
  {
    onClick,
    text,
    type,
  }: ButtonType
) => {
  const style = styles[type];
  return (
    <button
      className={style}
      onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
