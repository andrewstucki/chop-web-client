// @flow
import React from 'react';
import { theme } from '../styles';
import type { IconPropsType } from './';

const GuestExperienceLink = ({ color = theme.colors.gray50 }:IconPropsType) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8ZM16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM10.7071 7.29289L7.20711 3.79289L5.79289 5.20711L8.58579 8L5.79289 10.7929L7.20711 12.2071L10.7071 8.70711L11.4142 8L10.7071 7.29289Z" fill={color}/>
  </svg>
);

export default React.memo < IconPropsType > (GuestExperienceLink);