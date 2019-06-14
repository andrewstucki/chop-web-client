// @flow
import styled from 'styled-components';
import type { ComponentType } from 'react';
import type { NoPropsType } from '../../cwc-types';

export const PopperWraper:ComponentType<NoPropsType> = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: 2px;
  box-shadow: ${props => props.theme.shadows.shadow1};
  padding: 4px 8px;
  max-width: 400px;
  
  &, div, p {
    font-size: 13.44px;
    color: ${props => props.theme.colors.gray100};
  }
  
  p {
    margin: 0.5rem 0;
  }
  
  p:first-child {
    margin-top: 0;
  }
  
  p:last-child {
    margin-bottom: 0;
  }
  
`;
