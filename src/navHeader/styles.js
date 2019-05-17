// @flow
import styled from 'styled-components';
import type { ComponentType } from 'react';
import type { NoPropsType } from '../cwc-types';

const NavHeaderWrapper:ComponentType<NoPropsType> = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.gray5};
  height: 48px;
  width: 100%;
  z-index: 1;

`;

const NavHeaderHamburgerWrapper:ComponentType<NoPropsType> = styled.button`
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.textColor };
  text-transform: uppercase;
  text-decoration: none;
  position: relative;
  font-weight: 500;
  padding: 0 8px;
  margin:0px;
  border: none;
  background: transparent;
`;

export { NavHeaderWrapper, NavHeaderHamburgerWrapper };
