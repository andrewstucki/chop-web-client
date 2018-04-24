import React from 'react';
import btn from './style.css';

const Button = ({onClick, text}) => (
  <button className={btn.button} onClick={onClick}>{text}</button>
);

export default Button;