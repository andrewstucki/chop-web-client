// @flow
/* global SyntheticMouseEvent */
import React from 'react';
import type { ChannelType } from './dux';
import styles from './styles.css';
import hamburger from '../../assets/hamburger.svg';

type NavBarProps = {
  channels: Array<ChannelType>,
  onClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  openMenu: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  barX: number,
  barWidth: number,
};

const NavBar = ({channels, onClick, openMenu, barX, barWidth}: NavBarProps) => (
  <div className={styles.navBar}>
    <a
      href="javascript:void(0)"
      onClick={openMenu}
      className={styles.hamburger}
      dangerouslySetInnerHTML={{ __html: hamburger }}
    />
    {
      channels.map(channel => {
        const style = channel.isCurrent ? styles.selected : styles.default;
        return (
          <a
            id={'nav-' + channel.channel}
            href="javascript:void(0)"
            key={channel.channel}
            className={style}
            value={channel.channel}
            onClick={onClick}
          >
            {channel.channel}
          </a>
        );
      })
    }
    <div
      className={styles.bar}
      style={{
        left: barX + 'px',
        width: barWidth + 'px',
      }}
    ></div>
  </div>
);

export default NavBar;
