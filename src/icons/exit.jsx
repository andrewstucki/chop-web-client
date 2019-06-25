// @flow
import React from 'react';
import { theme } from '../styles';
import type { IconPropsType } from './';

const Exit = ({ size = 20, color = theme.colors.gray50 }:IconPropsType) => (
  <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M8.00015 15V17H15.0002L17.0002 17L17.0002 3L15.0002 3H8.00015V5L15.0002 5V15H8.00015ZM3.29304 9.2929L2.58594 10L3.29304 10.7071L7.29304 14.7071L8.70726 13.2929L6.41436 11H13.0002V9L6.41436 9L8.70726 6.70711L7.29304 5.2929L3.29304 9.2929Z" fill={color} />
  </svg>

);

export default React.memo < IconPropsType > (Exit);




