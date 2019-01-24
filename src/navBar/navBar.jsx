// @flow
/* global SyntheticMouseEvent, SyntheticTouchEvent */
import React from 'react';
import type { Node } from 'react';
import type { ChannelType } from './dux';
import styles from './styles.css';
import hamburger from '../../assets/hamburger.svg';
import { getAvatarColor, getFirstInitial } from '../util';
import { EVENT } from '../pane/content/event/dux';
import { CHAT } from '../pane/content/chat/dux';

type NavBarProps = {
  channels: Array<ChannelType>,
  setPrimaryPane: (id: string, type: 'EVENT' | 'CHAT') => void,
  openMenu: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  setNavbarIndex: (index:number) => void,
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
  selectedLink: { current: any };
  channelLink: (channel: ChannelType) => Node;
  channelTab: (channel: ChannelType, index:number) => Node;

  constructor (props: NavBarProps) {
    super(props);
    // $FlowFixMe
    this.selectedLink = React.createRef();
    this.state = {
      left: 20,
      width: 42,
      opacity: 1.0,
      directChatChannelNames: {},
    };
  }

  static getDerivedStateFromProps (
    props: NavBarProps,
    state: NavBarState
  ): NavBarState | null {
    let copyOfNames = { ...state.directChatChannelNames };
    let hasUpdated = false;
    const { channels } = props;

    channels.filter(channel => channel.isDirect).forEach(channel => {
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

    if (channel.name === 'Public' || channel.name === 'Host') {
      return (
        <span className={style}>
          {channel.name}
        </span>
      );
    } else {
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

  channelTab = (channel: ChannelType, index: number) => {
    const selectedLink = channel.isCurrent ? this.selectedLink : null;
    return (
      <a
        // $FlowFixMe
        ref={selectedLink}
        id={'nav-' + channel.name}
        href="javascript:void(0)"
        key={channel.id}
        className={styles.link}
        onClick={event => this.handleTabClick(channel, event)}
        data-index={index}
      >
        { channel.hasActions
          ? <span className={styles.pip}></span>
          : null }
        {this.channelLink(channel)}
      </a>
    );
  };

  handleTabClick = (channel: ChannelType, event:SyntheticTouchEvent<HTMLAnchorElement>):void => {
    const { setPrimaryPane, setNavbarIndex } = this.props;
    const { index } = event.currentTarget.dataset;
    setNavbarIndex(parseInt(index));
    setPrimaryPane(channel.id, channel.name === 'Public' ? EVENT : CHAT);
  };

  render () {
    const {
      channels,
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
            channels.map((channel, index) => (
              this.channelTab(channel, index)
            ))
          }
          {
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
