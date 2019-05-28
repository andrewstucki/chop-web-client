// @flow
import React from 'react';
import Actionable from '../components/Actionable';
import Hamburger from '../icons/hamburger';
import { NavHeaderWrapper, NavHeaderHamburgerWrapper, NavHeaderLogo } from './styles';

type NavHeaderProps = {
  logoUrl: string,
  backgroundColor: string,
  iconColor: string,
  openMenu: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
};

const NavHeader = ({ openMenu, logoUrl, backgroundColor, iconColor }:NavHeaderProps) => (
  <NavHeaderWrapper data-testid='navHeader' backgroundColor={backgroundColor}>
    <Actionable onClick={openMenu}>
      <NavHeaderHamburgerWrapper data-testid='navHeader-openMenu'>
        <Hamburger size={32} color={iconColor} />
      </NavHeaderHamburgerWrapper>
    </Actionable>
    { !!logoUrl && <NavHeaderLogo data-testid={'navHeader-logo'} src={logoUrl} /> }
  </NavHeaderWrapper>
);

export default NavHeader;
