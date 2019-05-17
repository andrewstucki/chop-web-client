// @flow strict
import React from 'react';

export default function tabOverflow () {
  return (
    <svg width={24} height={32} fill="none">
      <rect width={24} height={32} fill="url(#a)" />
      <path d="M10 11l5 5-5 5" stroke="#9F9FA0" />
      <defs>
        <linearGradient
          id="a"
          x1="5.21739"
          y1={16}
          x2="3.1369e-07"
          y2={16}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#ECECEC" stopOpacity="0.9" />
          <stop offset={1} stopColor="#ECECEC" stopOpacity={0} />
        </linearGradient>
      </defs>
    </svg>
  );
}
