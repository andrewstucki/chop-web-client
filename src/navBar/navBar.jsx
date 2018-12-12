// @flow
/* global SyntheticMouseEvent, React$Node */
import React from 'react';
import type { ChannelType } from './dux';
import styles from './styles.css';
import hamburger from '../../assets/hamburger.svg';
import { getAvatarColor, getFirstInitial } from '../util';
import { EVENT } from '../pane/content/event/dux';
import { CHAT } from '../pane/content/chat/dux';

type NavBarProps = {
  channels: Array<ChannelType>,
  onClick: (id: string, type: 'EVENT' | 'CHAT') => void,
  openMenu: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
};

type NavBarState = {
  left: number,
  width: number,
  opacity: number,
  directChatChannelNames: {
    [string]: string,
  },
};

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
  selectedLink: any;
  channelLink: (channel: ChannelType) => React$Node | string;
  channelTab: (channel: ChannelType) => React$Node;

  constructor (props: NavBarProps) {
    super(props);
    // $FlowFixMe
    this.selectedLink = React.createRef();
    this.state = {
      left: 20,
      width: 35,
      opacity: 1.0,
      directChatChannelNames: {},
    };

    this.channelTab = this.channelTab.bind(this);
  }

  static getDerivedStateFromProps (
    props: NavBarProps,
    state: NavBarState
  ): NavBarState | null {
    let copyOfNames = { ...state.directChatChannelNames };
    let hasUpdated = false;
    
    props.channels.forEach(channel => {
      if (channel.otherUsersNames.length > 0 &&
        state.directChatChannelNames[channel.id] !== channel.otherUsersNames[0]
      ) {
        hasUpdated = true;
        copyOfNames = {
          ...copyOfNames,
          [channel.id]: channel.otherUsersNames[0],
        };
      }
    });

    if (hasUpdated) {
      return {
        ...state,
        directChatChannelNames: copyOfNames,
      };
    } else {
      return null;
    }
  }

  componentDidUpdate () {
    if (this.selectedLink && this.selectedLink.current) {
      const marginWidth = 20;
      const selectedLink = this.selectedLink.current;
      const {
        left,
        width,
      } = selectedLink.getBoundingClientRect();
      const wrapperDiv = selectedLink.parentElement;
      const parentLeft = wrapperDiv.getBoundingClientRect().left;
      const parentScroll = wrapperDiv.scrollLeft;
      const wrapperLeftEdge = parentLeft + parentScroll;

      const updatedLeft = (left - wrapperLeftEdge) + marginWidth;
      const updatedWidth = width - (marginWidth * 2);
      const updatedOpacity = this.selectedLinkHasVisibleUnderline() ? 1.0 : 0.0;

      if (this.shouldUpdateState(updatedLeft, updatedWidth, updatedOpacity)) {
        this.setState(
          {
            left: updatedLeft,
            width: updatedWidth,
            opacity: updatedOpacity,
          }
        );
      }
    }
  }

  shouldUpdateState (
    updatedLeft: number,
    updatedWidth: number,
    updatedOpacity: number) {
    return this.state.left !== updatedLeft ||
      this.state.width !== updatedWidth ||
      this.state.opacity !== updatedOpacity;
  }

  selectedLinkHasVisibleUnderline () {
    return this.selectedLink.current.id === 'nav-Public' ||
      this.selectedLink.current.id === 'nav-Host';
  }

  channelLink (channel: ChannelType) {
    const style = channel.isCurrent ? null : styles.unselected;
    const opacity = channel.isCurrent ? '1.0' : '0.5';

    if (channel.name === 'Public') {
      return (
        <span className={style}>
          event
        </span>
      );
    } else if (channel.name === 'Host') {
      return (
        <span className={style}>
          {channel.name}
        </span>
      );
    } else if (channel.otherUsersNames.length > 0) {
      const names = this.state.directChatChannelNames;
      const channelIconName = names[channel.id] || '?';

      return (
        <div
          className={styles.avatar}
          style={
            {
              backgroundColor: getAvatarColor(channelIconName),
              opacity: opacity,
            }
          }
        >
          {getFirstInitial(channelIconName)}
        </div>
      );
    }
  }

  channelTab (channel: ChannelType) {
    const selectedLink = channel.isCurrent ? this.selectedLink : null;
    const { onClick } = this.props;
    return (
      <a
        // $FlowFixMe
        ref={selectedLink}
        id={'nav-' + channel.name}
        href="javascript:void(0)"
        key={channel.id}
        className={styles.link}
        onClick={() => onClick(channel.id, channel.name === 'Public' ? EVENT : CHAT)}
      >
        { channel.hasActions
          ? <span className={styles.pip}></span>
          : null }
        {this.channelLink(channel)}
      </a>
    );
  }

  render () {
    const {
      channels,
      openMenu,
    } = this.props;
    const publicChannel = channels.find(channel => channel.name.toUpperCase() === 'PUBLIC');
    const hostChannel = channels.find(channel => channel.name.toUpperCase() === 'HOST');
    const otherChannels = channels.filter(channel => channel.name.toUpperCase() !== 'PUBLIC' && channel.name.toUpperCase() !== 'HOST');
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
            publicChannel !== undefined &&
              this.channelTab(publicChannel)
          }
          {
            hostChannel !== undefined &&
              this.channelTab(hostChannel)
          }
          {
            otherChannels.map(channel => (
              this.channelTab(channel)
            ))
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
