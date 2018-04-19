import React from 'react';

const Button = ({click, text}) => (
  <button onClick={click}>{text}</button>
);

export default Button;