// @flow
import React from 'react';
import type { IconPropsType } from './index';

const LeftArrowIcon = ({color}:IconPropsType) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.29289 16.707L1.58579 9.99992L8.29289 3.29282L9.70711 4.70703L5.41421 8.99992L18 8.99992V10.9999L5.41421 10.9999L9.70711 15.2928L8.29289 16.707Z" fill={color}/>
  </svg>
);

export default React.memo < IconPropsType > (LeftArrowIcon);
