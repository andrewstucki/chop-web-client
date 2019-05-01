// @flow
import React from 'react';
import { theme } from '../styles';
import type { IconPropsType } from './';

const CommentOutline = ({ size = 32, color = theme.colors.gray50 }:IconPropsType) => (
  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M4 8H28V24H4V8ZM2 6H4H28H30V8V24V26H28H24L19 31V26H4H2V24V8V6Z" fill={color}/>
  </svg>
);

export default React.memo < IconPropsType > (CommentOutline);
