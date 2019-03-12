// @flow
import React from 'react';
import { theme } from '../styles';
import type { IconPropsType } from './';

const HamburgerIcon = ({large = true, color = theme.colors.gray50}:IconPropsType) => {
  if (large) {
    return (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M5 8H27V10H5V8ZM5 22H27V24H5V22ZM27 15H5V17H27V15Z" fill={color}/>
      </svg>
    );
  } else {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M3 4H17V6H3V4ZM3 14H17V16H3V14ZM17 9H3V11H17V9Z" fill={color}/>
      </svg>
    );
  }
};

export default React.memo < IconPropsType > (HamburgerIcon);
