// @flow
import React from 'react';
import type { IconPropsType } from './index';

const CalendarIcon = ({color, large = true}:IconPropsType) => {
  if (large) {
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M24 20H21V22H18V42H46V22H43V20H40V22H24V20ZM28.25 32H25.25V35H28.25V32ZM25.25 37H28.25V40H25.25V37ZM33.5 27H30.5V30H33.5V27ZM30.5 32H33.5V35H30.5V32ZM33.5 37H30.5V40H33.5V37ZM41 27H44V30H41V27ZM44 32H41V35H44V32ZM35.75 27H38.75V30H35.75V27ZM38.75 32H35.75V35H38.75V32ZM35.75 37H38.75V40H35.75V37ZM23 32H20V35H23V32ZM20 37H23V40H20V37ZM28.25 27H25.25V30H28.25V27Z"
          fill={color}/>
      </svg>
    );
  } else {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M4 3H6V4H14V3H16V4H18V16H2V4H4V3ZM14 8H16V10H14V8ZM6 12H4V14H6V12ZM7.33002 12H9.33002V14H7.33002V12ZM12.66 12H10.66V14H12.66V12ZM7.33002 8H9.33002V10H7.33002V8ZM12.66 8H10.66V10H12.66V8Z"
          fill={color}/>
      </svg>
    );
  }
};

export default React.memo < IconPropsType > (CalendarIcon);
