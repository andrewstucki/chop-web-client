// @flow
import React from 'react';
import { theme } from '../styles';

import type { IconPropsType } from './';

const DismissButton = ({size, color}:IconPropsType) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 4L10 10M16 16L10 10M10 10L16 4M10 10L4 16" stroke={color || theme.colors.background} strokeWidth="2"/>
  </svg>
);

export default React.memo < IconPropsType > (DismissButton);
