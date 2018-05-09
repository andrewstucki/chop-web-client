// @flow
/* global SyntheticMouseEvent */
import React from 'react';
import button from './style.css';

type ButtonType = {
  onClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  text: string,
}

const Button =
(
  {
    onClick,
    text,
  }: ButtonType
) => (
  <button
    className={button.icon}
    onClick={onClick}>
    {text}
  </button>
);

export default Button;