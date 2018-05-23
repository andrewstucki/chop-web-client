// @flow
/* global SyntheticMouseEvent */
import React from 'react';
import type { ChannelType } from './dux';
import navBarStyles from './styles.css';
import hamburger from '../../assets/hamburger.svg';

type NavBarProps = {
  channels: Array<ChannelType>,
  onClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  openMenu: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
};

const NavBar = ({channels, onClick, openMenu}: NavBarProps) => (
  <div className={navBarStyles.navBar}>
    <a
      href="javascript:void(0)"
      onClick={openMenu}
      className={navBarStyles.hamburger}
      dangerouslySetInnerHTML={{ __html: hamburger }}
    />
    {
      channels.map(channel => {
        const style = channel.isCurrent ? navBarStyles.selected : navBarStyles.default;
        return (
          <a
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
  </div>
);

export default NavBar;
