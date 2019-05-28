// @flow
import styled from 'styled-components';
import type { ComponentType } from 'react';
import type { NoPropsType } from '../cwc-types';

type NavHeaderWrapperProps = {
  backgroundColor: string,
};

const NavHeaderWrapper:ComponentType<NavHeaderWrapperProps> = styled.div`
  display: flex;
  background-color: ${props => props.backgroundColor ? props.backgroundColor : props.theme.colors.gray5};
  height: 48px;
  width: 100%;
  z-index: 1;
  align-items: center;
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

type NavHeaderLogoProps = {
  src: string,
};

const NavHeaderLogo:ComponentType<NavHeaderLogoProps> = styled.img`
  max-width: 240px;
  max-height: 40px;
  object-fit: contain;
`;

export { NavHeaderWrapper, NavHeaderHamburgerWrapper, NavHeaderLogo };
