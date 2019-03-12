// @flow
import React from 'react';
import type { IconPropsType } from './index';

const HostChatIcon = ({color, large = true}:IconPropsType) => {
  if (large) {
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M18 22H46V42H40L35 47V42H18V22ZM33.5716 30.3369L32 25.5L30.4284 30.3369H25.3426L29.4571 33.3262L27.8855 38.1631L32 35.1738L36.1145 38.1631L34.5429 33.3262L38.6574 30.3369H33.5716Z" fill={color}/>
      </svg>
    );
  } else {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M2 4H18V16H15L12 19V16H2V4ZM11.1226 9.00492L10 5.55L8.87743 9.00492H5.24472L8.18364 11.1402L7.06107 14.5951L10 12.4598L12.9389 14.5951L11.8164 11.1402L14.7553 9.00492H11.1226Z"
          fill={color}/>
      </svg>
    );
  }
};

export default React.memo < IconPropsType > (HostChatIcon);
