// @flow
/* global SyntheticMouseEvent */
import React from 'react';
import type { Node } from 'react';
import type { NavbarItemType } from './dux';
import styles from './styles.css';
import hamburger from '../../assets/hamburger.svg';
import { getAvatarColor, getFirstInitial } from '../util';
import { EVENT } from '../pane/content/event/dux';
import { CHAT } from '../pane/content/chat/dux';
import type { TabTypeType } from '../pane/content/tab/dux';
import {TAB} from '../pane/content/tab/dux';
import {PRIMARY_PANE} from '../pane/dux';

type NavBarProps = {
  items: Array<NavbarItemType>,
  openMenu: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  setPaneToEvent: (name: string, channelId: string) => void,
  setPaneToChat: (name: string, channelId: string) => void,
  setPaneToTab: (name: string, type: TabTypeType) => void,
  setNavbarIndex: (index: number) => void,
  navbarIndex: number,
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
  itemLink: (channel: NavbarItemType) => Node;
  itemTab: (channel: NavbarItemType, index:number) => Node;

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
    const { items } = props;

    items.filter(item => item.isDirect).forEach(item => {
      if (item.otherUsersNames.length > 0 &&
        state.directChatChannelNames[item.id] !== item.otherUsersNames[0]
      ) {
        hasUpdated = true;
        copyOfNames = {
          ...copyOfNames,
          [item.id]: item.otherUsersNames[0],
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
        width,
      } = selectedLink.getBoundingClientRect();

      selectedLink.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'end' });

      const updatedLeft = selectedLink.offsetLeft + marginWidth;
      const updatedWidth = width - (marginWidth * 2);
      const updatedOpacity = selectedLink.id !== 'nav-Direct' ? 1.0 : 0.0;
      const { navbarIndex, setNavbarIndex } = this.props;
      const { index } = selectedLink.dataset;

      if (this.shouldUpdateState(updatedLeft, updatedWidth, updatedOpacity)) {
        this.setState(
          {
            left: updatedLeft,
            width: updatedWidth,
            opacity: updatedOpacity,
          }
        );

        if (navbarIndex.toString() !== index) {
          setNavbarIndex(parseInt(index));
        }
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

  itemLink (item: NavbarItemType) {
    const style = item.isCurrent ? null : styles.unselected;
    const opacity = item.isCurrent ? '1.0' : '0.5';

    if (item.isDirect) {
      const names = this.state.directChatChannelNames;
      const channelIconName = names[item.id] || '?';
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
    } else {
      return (
        <span className={style}>
          {item.name}
        </span>
      );
    }
  }

  itemTab = (item: NavbarItemType, index: number) => {
    const selectedLink = item.isCurrent ? this.selectedLink : null;
    return (
      <a
        // $FlowFixMe
        ref={selectedLink}
        id={'nav-' + item.name.replace(/ /g,'')}
        href="javascript:void(0)"
        key={item.id}
        className={styles.link}
        onClick={() => this.handleTabClick(item)}
        data-index={index}
      >
        { item.hasActions
          ? <span className={styles.pip}></span>
          : null }
        {this.itemLink(item)}
      </a>
    );
  };

  handleTabClick = (item: NavbarItemType):void => {
    const { setPaneToEvent, setPaneToChat, setPaneToTab } = this.props;
    switch (item.type) {
    case EVENT:
      setPaneToEvent(PRIMARY_PANE, item.id);
      break;
    case CHAT:
      setPaneToChat(PRIMARY_PANE, item.id);
      break;
    case TAB:
      if (item.tabType) {
        setPaneToTab(PRIMARY_PANE, item.tabType);
      }
      break;
    }
  };

  render () {
    const {
      items,
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
          <div className={styles.channelLinksWrapper}>
            {
              items.map((item, index) => (
                this.itemTab(item, index)
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
      </div>
    );
  }
}

export default NavBar;
