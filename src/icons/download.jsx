// @flow
import React from 'react';
import type { IconPropsType } from './index';

const DownloadIcon = ({ color }:IconPropsType) => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M11 9.58579V3H9V9.58579L6.70711 7.29289L5.29289 8.70711L9.29289 12.7071L10 13.4142L10.7071 12.7071L14.7071 8.70711L13.2929 7.29289L11 9.58579ZM3 13H5V15H15V13H17V15V17H3V15V13Z" fill={color} />
  </svg>
);

export default React.memo < IconPropsType > (DownloadIcon);
