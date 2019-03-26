// @flow
import React from 'react';
import type { IconPropsType } from './index';

const BibleIcon = ({color, large = true}:IconPropsType) => {
  if (large) {
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M46 22H18V42H30L32 44L34 42H46V22ZM31 25H20V27H31V25ZM20 29H31V31H20V29ZM31 33H20V35H31V33ZM20 37H31V39H20V37ZM44 25H33V27H44V25ZM33 29H44V31H33V29ZM44 33H33V35H44V33ZM33 37H44V39H33V37Z" fill={color} />
      </svg>
    );
  } else {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M18 4H2V16H8.5L10 17.5L11.5 16H18V4ZM9 6H4V8H9V6ZM4 9H9V11H4V9ZM9 12H4V14H9V12ZM16 6H11V8H16V6ZM11 9H16V11H11V9ZM16 12H11V14H16V12Z"
          fill={color}/>
      </svg>
    );
  }
};

export default React.memo < IconPropsType > (BibleIcon);
