// @flow
import React from 'react';
import type { IconPropsType } from './index';

const LeftArrowIcon = ({color}:IconPropsType) => (
  <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 7L8 13M2 7L8 1M2 7L17 7" stroke={color} strokeWidth="2"/>
  </svg>
);

export default React.memo < IconPropsType > (LeftArrowIcon);
