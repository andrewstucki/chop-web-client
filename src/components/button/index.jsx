import React from 'react';
import { button } from './style.css';

const Button = ({onClick, text}) => (
  <button className={button} onClick={onClick}>{text}</button>
);

export default Button;