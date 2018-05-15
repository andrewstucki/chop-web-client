// @flow
import React from 'react';
import navBarStyles from './styles.css';

type NavBarProps = {
  channels: [
    string,
    string,
  ],
  currentChannel: string,
};

const NavBar = ({channels, currentChannel}:NavBarProps) => (
  <div className={navBarStyles.navBar}>
    {
      channels.map(channel => (
        <div key={channel} className={navBarStyles.channels}>
          <a href={channel} />
        </div>
      ))
    }
  </div>
);

export default NavBar;
