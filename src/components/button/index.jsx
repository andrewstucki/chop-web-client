// @flow
/* global SyntheticMouseEvent */
import React from 'react';
import styles from './style.css';

type ButtonType = {
  onClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  text?: string,
  image?: any,
  buttonType?: string,
  imageType?: string,
};

const Button =
(
  {
    onClick,
    text,
    image,
    buttonType,
    imageType,
  }: ButtonType
) => {
  const style = styles[buttonType];
  const imageStyle = styles[imageType];
  if (image) {
    return (
      <button
        className={style}
        onClick={onClick}
      >
        <div dangerouslySetInnerHTML={{ __html: image }} className={imageStyle}></div>
      </button>
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
