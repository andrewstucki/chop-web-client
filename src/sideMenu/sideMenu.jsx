// @flow
/* global SyntheticMouseEvent */
import React from 'react';
import SideMenuComponent from '../components/sideMenu';
import Button from '../components/button';

type SideMenuType = {
  logout: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  close: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  isClosed: boolean,
}

const SideMenu = ({logout, close, isClosed}: SideMenuType) => (
  <SideMenuComponent
    close={close}
    isClosed={isClosed}>
    <a
      href="https://live.life.church/">
      Switch to guest experience
    </a>
    <Button
      onClick={logout}
      text="Log out" />
  </SideMenuComponent>
);

export default SideMenu;