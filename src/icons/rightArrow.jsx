// @flow
import React from 'react';
import type { IconPropsType } from './index';

const RightArrowIcon = ({color}:IconPropsType) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M31 24L25 18M31 24L25 30M31 24H16" stroke={color} strokeWidth="2"/>
  </svg>
);

export default React.memo < IconPropsType > (RightArrowIcon);
