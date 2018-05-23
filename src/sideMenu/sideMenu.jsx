// @flow
/* global SyntheticMouseEvent */
import React from 'react';
import SideMenuComponent from '../components/sideMenu';
import Button from '../components/button';
import externalLink from '../../assets/external-link.svg';
import styles from './styles.css';

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
      <span
        className={styles.externalLinkIcon}
        dangerouslySetInnerHTML={{ __html: externalLink }}
      />
    </a>
    <Button
      onClick={logout}
      text="Log out" />
  </SideMenuComponent>
);

export default SideMenu;