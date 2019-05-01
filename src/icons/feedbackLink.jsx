// @flow
import React from 'react';
import { theme } from '../styles';
import type { IconPropsType } from './';

const FeedbackLink = ({ color = theme.colors.gray50 }:IconPropsType) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M0 0H4V2H2V12H12V10H14V14H0V0ZM7 0H14V7H12V3.41421L5.20711 10.2071L3.79289 8.79289L10.5858 2H7V0Z" fill={color}/>
  </svg>
);

export default React.memo < IconPropsType > (FeedbackLink);