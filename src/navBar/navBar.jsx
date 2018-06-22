// @flow
/* global SyntheticMouseEvent */
import React from 'react';
import type { ChannelType } from './dux';
import styles from './styles.css';
import hamburger from '../../assets/hamburger.svg';

type NavBarProps = {
  channels: Array<ChannelType>,
  onClick: (id: string) => void,
  openMenu: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
};

type NavBarState = {
  left: number,
  width: number,
}

const Underline = props => (
  <div
    id="nav-underline"
    className={styles.bar}
    style={
      {
        left: props.left.toString() + 'px',
        width: props.width.toString() + 'px',
      }
    }
  ></div>
);
class NavBar extends React.Component<NavBarProps, NavBarState> {
  selectedLink: any
  
  constructor (props:NavBarProps) {
    super(props);
    // $FlowFixMe
    this.selectedLink = React.createRef();
    this.state = {
      left: 69,
      width: 35,
    };
  }

  componentDidUpdate () {
    if (this.selectedLink && this.selectedLink.current) {
      const {
        left,
        width,
      } = this.selectedLink.current.getBoundingClientRect();
      if (this.state.left - 8 !== left) {
        this.setState(
          {
            left: left + 8,
            width: width - 16,
          }
        );
      }
    }
  }

  render () {
    const {
      channels,
      onClick,
      openMenu,
    } = this.props;
    return (
      <div id="nav-bar" className={styles.navBar}>
        <a
          href="javascript:void(0)"
          onClick={openMenu}
          className={styles.hamburger}
          dangerouslySetInnerHTML={{ __html: hamburger }}
        />
        {
          channels.map(channel => {
            const selectedLink = channel.isCurrent ? this.selectedLink : null;
            const style = channel.isCurrent ? null : styles.unselected;
            return (
              <a
                // $FlowFixMe
                ref={selectedLink}
                id={'nav-' + channel.id}
                href="javascript:void(0)"
                key={channel.id}
                className={styles.link}
                onClick={() => onClick(channel.id)}
              >
                { channel.hasActions
                  ? <span className={styles.pip}></span>
                  : null }
                <span className={style}>
                  {channel.id === 'public' ? 'event' : channel.id}
                </span>
              </a>
            );
          })
        }
        <Underline left={this.state.left} width={this.state.width} />
      </div>
    );
  }
}

export default NavBar;
