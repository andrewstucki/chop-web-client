import React from 'react';
import { theme } from '../styles';

const UpArrow = ({size, color}) => (
  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M3.29291 10.2929L12 1.58579L20.7071 10.2929L19.2929 11.7071L13 5.41421L13 22H11V5.41421L4.70712 11.7071L3.29291 10.2929Z" fill={color || theme.colors.textColor}/>
  </svg>
);

export default UpArrow;
