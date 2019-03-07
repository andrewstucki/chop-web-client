import React from 'react';

const RightArrow = ({color, _size}) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M31 24L25 18M31 24L25 30M31 24H16" stroke={color} strokeWidth="2"/>
  </svg>
);

export default RightArrow;