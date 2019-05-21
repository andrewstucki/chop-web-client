// @flow
import styled from 'styled-components';
import type { ComponentType } from 'react';
import type { NoPropsType } from '../../cwc-types';

export const Container:ComponentType<NoPropsType> = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.colors.gray5};
  border-radius: 24px;
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 0 8px 8px 0;
  width: 40px;
  height: 40px;
`;

export const Button = styled.button`
  border: none;
  background-color: transparent;
  padding: 0;
  line-height: 0;
  outline-style: none;
  -webkit-tap-highlight-color: transparent;
  
  svg {
    width: 28px;
  }
  
  svg:active {
    width: 38px;
  }
`;
