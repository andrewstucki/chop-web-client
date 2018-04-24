import React from 'react';
import { textfield } from './style.css'

const TextField = ({onInput, value}) => (
  <input className={textfield} type="text" onKeyUp={onInput} value={value} />
);

export default TextField;