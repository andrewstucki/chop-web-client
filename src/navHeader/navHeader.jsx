// @flow
/* global SyntheticMouseEvent */
import React from 'react';
import Actionable from '../components/Actionable';
import Hamburger from '../icons/hamburger';
import { NavHeaderWrapper, NavHeaderHamburgerWrapper } from './styles';

type NavHeaderProps = {
  openMenu: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
};

const NavHeader = ({ openMenu }:NavHeaderProps) => (
  <NavHeaderWrapper data-testid='navHeader'>
    <Actionable onClick={openMenu}>
      <NavHeaderHamburgerWrapper data-testid='navHeader-openMenu'>
        <Hamburger size={32}/>
      </NavHeaderHamburgerWrapper>
    </Actionable>
  </NavHeaderWrapper>
);

export default NavHeader;
