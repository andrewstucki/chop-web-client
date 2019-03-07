import styled from 'styled-components';
import { theme } from '../styles';

const NavbarWrapper = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.gray5};
  height: 48px;
  width: 100%;
  z-index: 1;

`;

const NavbarItemsWrapper = styled.div`
  overflow-x: scroll;
  display: flex;
  width: 100%;

`;

const NavbarItemsInnerWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  position: relative;
`;

const NavbarItemWrapper = styled.button`
  display: flex;
  align-items: center;
  padding: 0 12px;
  color: ${props => props.isCurrent ? theme.colors.textColor : theme.colors.gray50};
  text-transform: uppercase;
  position: relative;
  font-weight: 500;
  border: none;
  background: transparent;
  outline: none;
`;

const NavbarHamburgerWrapper = styled.button`
  display: flex;
  align-items: center;
  color: ${ theme.colors.textColor };
  text-transform: uppercase;
  text-decoration: none;
  position: relative;
  font-weight: 500;
  padding: 0 8px;
  margin:0px;
  border: none;
  background: transparent;
`;

const Pip = styled.span`
  height:8px;
  width:8px;
  border-radius: 50%;
  background-color: ${theme.colors.primary};
  position: absolute;
  top: 6px;
  right: 3px;
`;

const Underline = styled.div`
  display: flex;
  content: "";
  position: absolute;
  height: 2px;
  bottom: 8px;
  background-color: ${theme.colors.textColor};
  transition: width ${ theme.animation.duration } ${ theme.animation.easeOut }, left ${ theme.animation.duration } ${ theme.animation.easeOut }, opacity ${ theme.animation.duration } ${ theme.animation.easeOut };
  left: ${ props => props.left }px;
  width: ${ props => props.width }px;
  opacity: ${ props => props.opacity };
`;

export {
  NavbarWrapper,
  NavbarItemsWrapper,
  NavbarItemsInnerWrapper,
  NavbarItemWrapper,
  NavbarHamburgerWrapper,
  Pip,
  Underline,
};
