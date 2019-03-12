// @flow
import React from 'react';
import type { IconPropsType } from './index';


const BibleIcon = ({color, large = true}:IconPropsType) => {
  if (large) {
    return (
      <svg width="28" height="22" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M28 0H0V20H12L14 22L16 20H28V0ZM13 3H2V5H13V3ZM2 7H13V9H2V7ZM13 11H2V13H13V11ZM2 15H13V17H2V15ZM26 3H15V5H26V3ZM15 7H26V9H15V7ZM26 11H15V13H26V11ZM15 15H26V17H15V15Z"
          fill={color}/>
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
