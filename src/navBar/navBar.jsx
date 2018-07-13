// @flow
/* global SyntheticMouseEvent, React$Node */
import React from 'react';
import type { ChannelType } from './dux';
import styles from './styles.css';
import hamburger from '../../assets/hamburger.svg';
import { getAvatarColor, getFirstInitial } from '../util';

type NavBarProps = {
  channels: Array<ChannelType>,
  onClick: (id: string) => void,
  openMenu: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
};

type NavBarState = {
  left: number,
  width: number,
  opacity: number,
}

const Underline = props => (
  <div
    id="nav-underline"
    className={styles.bar}
    style={
      {
        left: props.left.toString() + 'px',
        width: props.width.toString() + 'px',
        opacity: props.opacity.toString(),
      }
    }
  ></div>
);
class NavBar extends React.Component<NavBarProps, NavBarState> {
  selectedLink: any
  channelLink: (channel:ChannelType) => React$Node | string
  
  constructor (props:NavBarProps) {
    super(props);
    // $FlowFixMe
    this.selectedLink = React.createRef();
    this.state = {
      left: 20,
      width: 35,
      opacity: 1.0,
    };
  }

  componentDidUpdate () {
    if (this.selectedLink && this.selectedLink.current) {
      const {
        left,
        width,
      } = this.selectedLink.current.getBoundingClientRect();
      const parentLeft = this.selectedLink.current.parentElement.getBoundingClientRect().left;
      if (this.state.left !== (left - parentLeft) + 20) {
        this.setState(
          {
            left: (left - parentLeft) + 20,
            width: width - 40,
            opacity: this.selectedLink.current.id === 'nav-public' ||
              this.selectedLink.current.id === 'nav-host' ? 1.0 : 0.0,
          }
        );
      }
    }
  }

  channelLink (channel: ChannelType) {
    const style = channel.isCurrent ? null : styles.unselected;
    if (channel.id === 'public') {
      return (
        <span className={style}>
          event
        </span>
      );
    } else if (channel.id === 'host') {
      return (
        <span className={style}>
          {channel.id}
        </span>
      );
    } else if (channel.directChatParticipant) {
      const opacity = channel.isCurrent ? '1.0' : '0.5';
      return (
        <div
          className={styles.avatar} 
          style={{backgroundColor: getAvatarColor(channel.directChatParticipant, opacity)}}
        >
          {getFirstInitial(channel.directChatParticipant)}
        </div>
      );
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
        <div className={styles.channelLinks}>
          {
            channels.map(channel => {
              const selectedLink = channel.isCurrent ? this.selectedLink : null;
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
                  {this.channelLink(channel)}
                </a>
              );
            })
          }
          {channels.length &&
            <Underline
              left={this.state.left}
              width={this.state.width}
              opacity={this.state.opacity}
            />
          }
        </div>
      </div>
    );
  }
}

export default NavBar;
