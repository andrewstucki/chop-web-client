// @flow
import React from 'react';

export const Spinner = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
    <path d="M28 16C28 9.37258 22.6274 4 16 4" stroke="white" strokeWidth="2" fill="none">
      <animateTransform
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0 16 16"
        to="360 16 16"
        dur="0.75s"
        repeatCount="indefinite"/>
    </path>
  </svg>
);

export default Spinner;
