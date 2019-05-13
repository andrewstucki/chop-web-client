// @flow
import styled from 'styled-components';

const NavHeaderWrapper = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.gray5};
  height: 48px;
  width: 100%;
  z-index: 1;

`;

const NavHeaderHamburgerWrapper = styled.button`
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
