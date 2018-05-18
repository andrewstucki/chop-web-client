// @flow
/* global SyntheticMouseEvent */
import React from 'react';
import type { ChannelType } from './dux';
import navBarStyles from './styles.css';

type NavBarProps = {
  channels: Array<ChannelType>,
  onClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
};

const NavBar = ({channels, onClick}: NavBarProps) => (
  <div className={navBarStyles.navBar}>
    {
      channels.map(channel => {
        const style = channel.isCurrent ? navBarStyles.selected : navBarStyles.default;
        return (
          <div
            key={channel.channel}
            className={style}
            value={channel.channel}
            onClick={onClick}
          >
            {channel.channel}
          </div>
        );
      })
    }
  </div>
);

export default NavBar;
