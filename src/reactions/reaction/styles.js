// @flow
import styled, { keyframes } from 'styled-components';
import type { ComponentType } from 'react';
import type { NoPropsType } from '../../cwc-types';

const moveFade = keyframes`
  from {
    opacity: 1; 
    transform: translateY(26px)
  }
  to {
    opacity: 0;
    transform: translateY(-270px)
  }
`;

export const Wrapper:ComponentType<NoPropsType> = styled.div`
  animation: 2.3s ${moveFade} ease-out;
`;
