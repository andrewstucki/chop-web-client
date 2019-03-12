import React from 'react';

const HostInfo = ({color, large}) => {
  if (large) {
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M45 32C45 39.1797 39.1797 45 32 45C24.8203 45 19 39.1797 19 32C19 24.8203 24.8203 19 32 19C39.1797 19 45 24.8203 45 32ZM33 30V38H31V30H33ZM33 28V26H31V28H33Z" fill={color}/>
      </svg>
    );
  } else {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd"
          d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM11 8V15H9V8H11ZM11 7V5H9V7H11Z"
          fill={color}/>
      </svg>
    );
  }
};

export default HostInfo;