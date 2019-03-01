// @flow
import React from 'react';
import { theme } from '../styles';
import type { IconPropsType } from './';

const Hamburger = ({size = 32, color}:IconPropsType) => (
  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M5 8H27V10H5V8ZM5 22H27V24H5V22ZM27 15H5V17H27V15Z" fill={color || theme.colors.textColor}/>
  </svg>
);

export default React.memo < IconPropsType > (Hamburger);
