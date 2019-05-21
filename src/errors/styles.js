// @flow
import styled from 'styled-components';
import type { ComponentType } from 'react';
import type { NoPropsType } from '../cwc-types';

export const Wrapper:ComponentType<NoPropsType> = styled.div`
  margin: 1rem 0;
  
  p {
    color: ${props => props.theme.colors.dangerText};
  }
`;
