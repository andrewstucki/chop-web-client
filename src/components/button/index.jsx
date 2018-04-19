import React from 'react';
import btn from './style';

const Button = ({click, text}) => (
  <button className={btn.button} onClick={click}>{text}</button>
);

export default Button;