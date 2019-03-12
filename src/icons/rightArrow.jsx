// @flow
import React from 'react';
import type { IconPropsType } from './index';

const RightArrowIcon = ({color}:IconPropsType) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M11.7071 3.29297L18.4142 10.0001L11.7071 16.7072L10.2929 15.293L14.5858 11.0001H2V9.00008H14.5858L10.2929 4.70718L11.7071 3.29297Z" fill={color}/>
  </svg>
);

export default React.memo < IconPropsType > (RightArrowIcon);
